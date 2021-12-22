import {
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {AppCommand} from '../../classes/AppCommand'
import {isAdmin} from '../../functions/isAdmin'
import {GeneralSettings} from '../../settings/General'
import {RecurringMeetings} from '../../settings/RecurringMeetings'

export class GetSettingsSubcommand extends AppCommand {
    public command: string = 'settings'

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
        args?: Array<string>
    ): Promise<void> {
        if (!isAdmin(context.getSender())) {
            this.notifySender({
                context,
                read,
                modify,
                message: {
                    // tslint:disable-next-line: quotemark
                    text: "you don't have enough permissions to run this command"
                }
            })
            return
        }
        let message: string = '# BBB App Settings\n'
        for (const setting of Object.values(GeneralSettings)) {
            message += `*${setting.i18nLabel}* → "${await read
                .getEnvironmentReader()
                .getSettings()
                .getValueById(setting.id)}"\n`
        }

        for (const setting of Object.values(RecurringMeetings)) {
            message += `*${setting.i18nLabel}* → "${await read
                .getEnvironmentReader()
                .getSettings()
                .getValueById(setting.id)}"\n`
        }

        this.notifySender({context, read, modify, message: {text: message}})
    }
}
