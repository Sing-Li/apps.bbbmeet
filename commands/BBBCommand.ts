import {
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {WeeklySubcommand} from '.'
import {AppCommand} from '../classes'

export class BBBSlashCommand extends AppCommand {
    public command: string = 'bbb'
    public i18nDescription: string = ''
    public i18nParamsExample: string = ''
    public providesPreview: boolean = false

    public constructor(app: App) {
        super(app)
        this.registerCommand(new WeeklySubcommand(this.app))
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        await this.handleCommands(
            {context, read, modify, http, persis},
            context.getArguments()
        )
    }
}