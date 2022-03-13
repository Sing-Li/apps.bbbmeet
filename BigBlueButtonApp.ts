import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger
} from '@rocket.chat/apps-engine/definition/accessors'
import { ApiSecurity, ApiVisibility } from '@rocket.chat/apps-engine/definition/api'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {IAppInfo} from '@rocket.chat/apps-engine/definition/metadata'
import {ISetting} from '@rocket.chat/apps-engine/definition/settings'
import {BBBSlashCommand} from './commands/BBBCommand'
import {WeeklyJoinSubcommand} from './commands/weekly/WeeklyJoinSubcommand'
import {WebhookEndpoint} from './endpoints/webhook'
import {RecurringMeetings} from './settings/RecurringMeetings'

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
        configuration.api.provideApi({
            visibility: ApiVisibility.PUBLIC,
            security: ApiSecurity.UNSECURE,
            endpoints: [new WebhookEndpoint(this)],
        });

        await Promise.all(
            Object.values(RecurringMeetings).map((setting: ISetting) =>
                configuration.settings.provideSetting(setting)
            )
        )
    }
}
