import {
    IAppAccessors,
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {RecurringNotificationJobs} from '../../../../enums/RecurringNotificationJobs'
import {errorSettingCallback} from '../../../../functions/errorSettingCallback'
import {getCronExpression} from '../../../../functions/getCronExpression'
import {getSettingValue} from '../../../../functions/getSetting'
import {notifySender} from '../../../../functions/notifySender'
import {AppCommand} from '../../../../internals/AppCommand'
import {HelpCommand} from '../../../../internals/HelpCommand'
import {GeneralSettings} from '../../../../settings/General'
import {RecurringMeetings} from '../../../../settings/RecurringMeetings'

export class WeeklyNotificationStartSubcommand extends AppCommand {
    public command: string = 'start'
    public i18nDescription: string = 'Start weekly notifications'

    constructor(app: App) {
        super({app})
        this.registerCommand(new HelpCommand(this))
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
        args?: Array<string>
    ): Promise<void> {
        const accessors: IAppAccessors = this.getApp().getAccessors()
        const dayOfWeek: string = await getSettingValue(
            accessors,
            RecurringMeetings.weeklyDay,
            errorSettingCallback,
            {
                context,
                read,
                modify,
                setting: RecurringMeetings.weeklyDay
            }
        )
        const timeString: string = await getSettingValue(
            accessors,
            RecurringMeetings.weeklyMeetingTime,
            errorSettingCallback,
            {
                context,
                read,
                modify,
                setting: RecurringMeetings.weeklyMeetingTime
            }
        )
        const cronExpr: string | undefined = getCronExpression(dayOfWeek, timeString)
        if (cronExpr === undefined) {
            await notifySender({
                context,
                read,
                modify,
                message: {text: 'invalid weekly meeting time string detected'}
            })
            throw new Error('invalid weekly meeting time string detected')
        }
        // before starting the job
        // we need to make sure of a couple more things
        await getSettingValue(accessors, RecurringMeetings.weeklyRoomId, errorSettingCallback, {
            context,
            read,
            modify,
            setting: RecurringMeetings.weeklyRoomId
        })

        await getSettingValue(accessors, GeneralSettings.notificationRooms, errorSettingCallback, {
            context,
            read,
            modify,
            setting: GeneralSettings.notificationRooms
        })
        if (
            typeof (await modify.getScheduler().scheduleRecurring({
                id: RecurringNotificationJobs.WEEKLY,
                interval: 'five seconds',
                skipImmediate: false
            })) === 'string'
        ) {
            return await notifySender({
                context,
                read,
                modify,
                message: {text: 'successfully started weekly notifications'}
            })
        }
        await notifySender({
            context,
            read,
            modify,
            message: {text: 'failed to start weekly notifications'}
        })
    }
}
