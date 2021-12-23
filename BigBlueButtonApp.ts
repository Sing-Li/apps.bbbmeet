import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    ILogger
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {IAppInfo} from '@rocket.chat/apps-engine/definition/metadata'
import {BBBSlashCommand} from './commands/BBBCommand'
import {WeeklyJoinSubcommand} from './commands/recurring/weekly/WeeklyJoinSubcommand'
import {RecurringNotificationJobs} from './enums/RecurringNotificationJobs'
import {getAllSettings} from './functions/getAllSettings'

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
        for await (const setting of getAllSettings(this.getAccessors())) {
            await configuration.settings.provideSetting(setting)
        }
    }

    private async provideSlashCommands(
        configuration: IConfigurationExtend
    ): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(
            new BBBSlashCommand(this)
        )
        await configuration.slashCommands.provideSlashCommand(
            new WeeklyJoinSubcommand().slashCommand({
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
                id: RecurringNotificationJobs.WEEKLY,
                processor: async () => {
                    console.log('processor')
                }
            }
        ])
    }
}
