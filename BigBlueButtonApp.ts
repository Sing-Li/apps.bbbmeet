import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {IAppInfo} from '@rocket.chat/apps-engine/definition/metadata'
import {BBBSlashCommand} from './commands/BBBCommand'
import {WeeklyJoinSubcommand} from './commands/weekly/WeeklyJoinSubcommand'

export default class BigBlueButton extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors)
    }

    protected async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {
        configuration.slashCommands.provideSlashCommand(
            new BBBSlashCommand(this)
        )
        configuration.slashCommands.provideSlashCommand(
            new WeeklyJoinSubcommand(this).slashCommand({
                i18nDescription: '',
                i18nParamsExample: '',
                providesPreview: false,
                alias: 'weekly'
            })
        )
    }
}
