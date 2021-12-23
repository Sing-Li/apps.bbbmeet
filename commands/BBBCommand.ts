import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {AppCommand} from '../internals/AppCommand'
import {HelpCommand} from '../internals/HelpCommand'
import {GetSubcommand} from './common/GetSubcommand'
import {RecurringSubcommand} from './recurring/RecurringSubcommand'

export class BBBSlashCommand extends AppCommand {
    public command: string = 'bbb'
    public i18nDescription: string = 'Manage Big Blue Button integration from Rocket.Chat!'
    public i18nParamsExample: string = ''
    public providesPreview: boolean = false

    public constructor(app: App) {
        super({app})
        this.registerCommand(new RecurringSubcommand(app))
        this.registerCommand(new GetSubcommand(app))
        this.registerCommand(new HelpCommand(this))
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        await this.handleCommands({context, read, modify, http, persis})
    }
}
