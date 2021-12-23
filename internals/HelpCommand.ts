import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {isAdmin} from '../functions/isAdmin'
import {notifySender} from '../functions/notifySender'
import {AppCommand} from './AppCommand'

export class HelpCommand extends AppCommand {
    public command: string = 'help'
    public i18nDescription: string = 'Show this help screen'

    constructor(parent: AppCommand) {
        super({parent})
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http?: IHttp,
        persis?: IPersistence,
        args?: Array<string>
    ): Promise<void> {
        let text: string = ''
        if (args !== undefined && args?.length > 0) {
            text += `unknown command \`${args.join(
                ' '
            )}\` ...nothing to do...please run \`/bbb [command]...[subcommand] help\` for a list of available commands and their description.\n`
        }
        const parent: AppCommand = this.getParent()
        text += `-----------------------------\n|  *BBB x Rocket.Chat HELP*  |\n-----------------------------\n`
        text += `\`${parent.command}\`: ${parent.i18nDescription}\n`
        text += `\`\`\`\n`
        for (const command of parent.getSubcommands()) {
            if (command.hidden && !isAdmin(context.getSender())) {
                continue
            }
            text += `    ${command.command}:\n        ${command.i18nDescription}\n`
        }
        text += `\`\`\``
        notifySender({
            context,
            read,
            modify,
            message: {text}
        })
    }
}
