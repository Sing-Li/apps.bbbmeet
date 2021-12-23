import {App} from '@rocket.chat/apps-engine/definition/App'
import {AppCommand} from '../../../../internals/AppCommand'
import {HelpCommand} from '../../../../internals/HelpCommand'
import {WeeklyNotificationStartSubcommand} from './NotificationStartSubcommand'
import {WeeklyNotificationStopSubcommand} from './NotificationStopSubcommand'

export class NotificationSubcommand extends AppCommand {
    public command: string = 'notification'
    public i18nDescription: string = 'Handle weekly notifications'

    public hidden: boolean = true

    constructor(app: App) {
        super({app})
        this.registerCommand(new WeeklyNotificationStartSubcommand(app))
        this.registerCommand(new WeeklyNotificationStopSubcommand(app))
        this.registerCommand(new HelpCommand(this))
    }
}
