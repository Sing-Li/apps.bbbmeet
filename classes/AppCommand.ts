import {
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {IMessage} from '@rocket.chat/apps-engine/definition/messages'
import {
    ISlashCommand,
    ISlashCommandPreview,
    ISlashCommandPreviewItem,
    SlashCommandContext
} from '@rocket.chat/apps-engine/definition/slashcommands'
import {IUser} from '@rocket.chat/apps-engine/definition/users'

export class AppCommand implements ISlashCommand {
    public command: string
    public i18nDescription: string
    public i18nParamsExample: string
    public providesPreview: boolean

    public previewer: (
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ) => Promise<ISlashCommandPreview>

    public executePreviewItem: (
        item: ISlashCommandPreviewItem,
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ) => Promise<void>

    private readonly commandMap: Map<string, AppCommand> = new Map()

    constructor(protected readonly app: App) {
        this.app = app
    }

    public slashCommand(
        slash: Omit<ISlashCommand, 'command' | 'executor'> & {alias?: string}
    ): AppCommand {
        this.i18nDescription = slash.i18nDescription
        this.i18nParamsExample = slash.i18nParamsExample
        this.providesPreview = slash.providesPreview
        if (slash.alias) {
            this.command = slash.alias
        }
        if (slash.previewer) {
            this.previewer = slash.previewer
        }
        if (slash.executePreviewItem) {
            this.executePreviewItem = slash.executePreviewItem
        }
        return this
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
        args?: Array<string>
    ): Promise<void> {
        // entrypoint of a command (slashcommand or subcommand, either)
        this.app
            .getLogger()
            .warn(`${this.command} command is not yet implemented`)
    }

    protected registerCommand(command: AppCommand): void {
        this.commandMap.set(command.command, command)
    }

    protected hasSubcommand(subcommand: string): boolean {
        return this.commandMap.has(subcommand)
    }

    protected async handleCommands(
        {
            context,
            read,
            modify,
            http,
            persis
        }: {
            context: SlashCommandContext
            read: IRead
            modify: IModify
            http: IHttp
            persis: IPersistence
        },
        args: Array<string>
    ): Promise<void> {
        const [command, ...commandArgs]: Array<string> = args

        const commandHandler = this.commandMap.get(command) as AppCommand

        if (commandHandler.hasSubcommand(commandArgs[0])) {
            await commandHandler.handleCommands(
                {context, read, modify, http, persis},
                commandArgs
            )
            return
        }
        await commandHandler.executor(
            context,
            read,
            modify,
            http,
            persis,
            commandArgs
        )
    }

    protected async notifySender({
        context,
        read,
        modify,
        message
    }: {
        context: SlashCommandContext
        modify: IModify
        read: IRead
        message: Omit<IMessage, 'sender' | 'room'>
    }): Promise<void> {
        await modify.getNotifier().notifyUser(context.getSender(), {
            room: context.getRoom(),
            sender: (await read.getUserReader().getAppUser()) as IUser,
            ...message
        })
    }
}
