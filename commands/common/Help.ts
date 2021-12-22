import {
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {AppCommand} from '../../classes/AppCommand'

export class HelpCommand extends AppCommand {
    public command: string = 'help'

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
        args?: Array<string>
    ): Promise<void> {}
}
