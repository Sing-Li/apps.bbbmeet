import {
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {
    ISlashCommand,
    ISlashCommandPreview,
    ISlashCommandPreviewItem,
    SlashCommandContext
} from '@rocket.chat/apps-engine/definition/slashcommands'
import {IUser} from '@rocket.chat/apps-engine/definition/users'
import {isAdmin} from '../functions/isAdmin'

export class AppCommand implements ISlashCommand {
    public command: string
    public i18nDescription: string
    public i18nParamsExample: string
    public providesPreview: boolean

    public hidden: boolean = false

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
    private readonly app: App
    private readonly parent: AppCommand

    constructor({app, parent}: {app?: App; parent?: AppCommand}) {
        this.app = app as App
        this.parent = parent as AppCommand
    }

    public getApp = (): App => this.app

    public getParent = (): AppCommand => this.parent

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
        // tslint:disable-next-line: variable-name
        const __executor: (
            context: SlashCommandContext,
            read: IRead,
            modify: IModify,
            http: IHttp,
            persis: IPersistence,
            args?: Array<string>
        ) => Promise<void> = this.executor
        // tslint:disable-next-line: space-before-function-paren
        this.executor = async (
            context: SlashCommandContext,
            read: IRead,
            modify: IModify,
            http: IHttp,
            persis: IPersistence
        ): Promise<void> => {
            await this.handleCommands(
                {context, read, modify, http, persis},
                async ({
                    // tslint:disable: no-shadowed-variable
                    context,
                    read,
                    modify,
                    http,
                    persis
                }: // tslint:enable: no-shadowed-variable
                {
                    context: SlashCommandContext
                    read: IRead
                    modify: IModify
                    http: IHttp
                    persis: IPersistence
                }): Promise<void> => {
                    const args: Array<string> = context.getArguments()
                    if (args.length === 0) {
                        return await __executor(
                            context,
                            read,
                            modify,
                            http,
                            persis
                        )
                    }
                    return await this.showHelp(
                        {context, read, modify, http, persis},
                        args
                    )
                },
                {context, read, modify, http, persis}
            )
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
            .warn(`command "${this.command}" not yet implemented`)
    }

    public *getSubcommands() {
        for (const command of this.commandMap) {
            yield command[1]
        }
    }

    protected registerCommand(command: AppCommand): void {
        this.commandMap.set(command.command, command)
    }

    protected accessibleSubcommand(
        sender: IUser,
        subcommand: string
    ): AppCommand | undefined {
        const command: AppCommand | undefined = this.commandMap.get(subcommand)
        if (command === undefined || (command.hidden && !isAdmin(sender))) {
            return undefined
        }
        return command
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
        callback?: (args?: any) => Promise<any>,
        callbackArgs?: any
    ): Promise<void> {
        const args: Array<string> = context.getArguments()
        const [command, ...commandArgs]: Array<string> = args
        const sender: IUser = context.getSender()
        const commandHandler: AppCommand | undefined =
            this.accessibleSubcommand(sender, command)

        if (commandHandler === undefined) {
            return callback === undefined
                ? await this.showHelp(
                      {context, read, modify, http, persis},
                      args
                  )
                : await callback(callbackArgs)
        }

        await commandHandler.handleSubcommands(
            {context, read, modify, http, persis},
            sender,
            commandHandler,
            commandArgs
        )
    }

    protected async handleSubcommands(
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
        sender: IUser,
        commandHandler: AppCommand,
        commandArgs: Array<string>
    ): Promise<void> {
        if (commandArgs.length === 0) {
            return await commandHandler.executor(
                context,
                read,
                modify,
                http,
                persis,
                commandArgs
            )
        }

        const [subCommand, ...subCommandArgs]: Array<string> = commandArgs
        const subCommandHandler: AppCommand | undefined =
            commandHandler.accessibleSubcommand(sender, subCommand)

        if (subCommandHandler === undefined) {
            return await commandHandler.showHelp(
                {context, read, modify, http, persis},
                commandArgs
            )
        }

        await subCommandHandler.handleSubcommands(
            {context, read, modify, http, persis},
            sender,
            subCommandHandler,
            subCommandArgs
        )
    }

    protected async showHelp(
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
    ): Promise<any> {
        return await this.commandMap
            .get('help')
            ?.executor(context, read, modify, http, persis, args)
    }
}
