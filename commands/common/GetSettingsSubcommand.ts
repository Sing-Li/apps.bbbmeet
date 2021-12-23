import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {getAllSettings} from '../../functions/getAllSettings'
import {notifySender} from '../../functions/notifySender'
import {AppCommand} from '../../internals/AppCommand'
import {HelpCommand} from '../../internals/HelpCommand'

export class GetSettingsSubcommand extends AppCommand {
    public command: string = 'settings'
    public i18nDescription: string = 'Show app settings'
    public hidden: boolean = true

    constructor(app: App) {
        super({app})
        this.registerCommand(new HelpCommand(this))
    }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence, args?: Array<string>): Promise<void> {
        let message: string = '# BBB App Settings\n'
        for await (const setting of getAllSettings(this.getApp().getAccessors())) {
            message += `*${setting.i18nLabel}* → "${await read.getEnvironmentReader().getSettings().getValueById(setting.id)}"\n`
        }

        notifySender({context, read, modify, message: {text: message}})
    }
}
