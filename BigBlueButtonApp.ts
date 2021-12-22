import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {IAppInfo} from '@rocket.chat/apps-engine/definition/metadata'
import {ISetting} from '@rocket.chat/apps-engine/definition/settings'
import {BBBSlashCommand} from './commands/BBBCommand'
import {WeeklyJoinSubcommand} from './commands/weekly/WeeklyJoinSubcommand'
import {sendRecurringNotification} from './processors/RecurringNotificationProcessor'
import {GeneralSettings} from './settings/General'
import {RecurringMeetings} from './settings/RecurringMeetings'

export default class BigBlueButton extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors)
    }

    protected async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {
        await this.provideSlashCommands(configuration)
        await this.provideSettings(configuration)
        await this.registerProcessors(configuration)
    }

    private async provideSettings(
        configuration: IConfigurationExtend
    ): Promise<void> {
        await Promise.all(
            Object.values(GeneralSettings).map((setting: ISetting) =>
                configuration.settings.provideSetting(setting)
            )
        )
        await Promise.all(
            Object.values(RecurringMeetings).map((setting: ISetting) =>
                configuration.settings.provideSetting(setting)
            )
        )
    }

    private async provideSlashCommands(
        configuration: IConfigurationExtend
    ): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(
            new BBBSlashCommand(this)
        )
        await configuration.slashCommands.provideSlashCommand(
            new WeeklyJoinSubcommand(this).slashCommand({
                i18nDescription: 'Join weekly meeting on BBB',
                i18nParamsExample: 'n/a',
                providesPreview: false,
                alias: 'weekly'
            })
        )
    }

    private async registerProcessors(
        configuration: IConfigurationExtend
    ): Promise<void> {
        await configuration.scheduler.registerProcessors([
            {
                id: 'BBB_Recurring_MeetingNotification',
                processor: sendRecurringNotification
            }
        ])
    }
}
