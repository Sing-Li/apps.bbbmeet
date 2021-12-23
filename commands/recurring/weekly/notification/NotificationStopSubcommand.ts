import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {RecurringNotificationJobs} from '../../../../enums/RecurringNotificationJobs'
import {notifySender} from '../../../../functions/notifySender'
import {AppCommand} from '../../../../internals/AppCommand'
import {HelpCommand} from '../../../../internals/HelpCommand'

export class WeeklyNotificationStopSubcommand extends AppCommand {
    public command: string = 'stop'
    public i18nDescription: string = 'Stop recurring weekly meeting notifications'

    constructor(app: App) {
        super({app})
        this.registerCommand(new HelpCommand(this))
    }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence, args?: Array<string>): Promise<void> {
        await modify.getScheduler().cancelJob(RecurringNotificationJobs.WEEKLY)
        await notifySender({
            context,
            read,
            modify,
            message: {text: 'successfully stopped weekly meeting notifications'}
        })
    }
}
