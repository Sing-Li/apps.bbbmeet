import {
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {AppCommand} from '../../classes/AppCommand'
import {GetSettingsSubcommand} from './GetSettingsSubcommand'

export class GetSubcommand extends AppCommand {
    public command: string = 'get'

    constructor(app: App) {
        super(app)
        this.registerCommand(new GetSettingsSubcommand(this.app))
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
        args?: Array<string>
    ): Promise<void> {
        this.notifySender({
            context,
            read,
            modify,
            message: {
                text: `unknown "${this.command}" command "${
                    args !== undefined ? args[0] : 'undefined'
                }"`
            }
        })
    }
}
