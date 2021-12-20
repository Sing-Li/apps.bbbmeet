import {
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {AppCommand} from '../classes/AppCommand'
import {WeeklySubcommand} from './weekly/WeeklySubcommand'

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
        const args: Array<string> = context.getArguments()
        if (!this.hasSubcommand(args[0])) {
            this.notifySender({
                context,
                read,
                modify,
                message: {
                    text: `${args[0]} command not found`
                }
            })
        }
        await this.handleCommands({context, read, modify, http, persis}, args)
    }
}
