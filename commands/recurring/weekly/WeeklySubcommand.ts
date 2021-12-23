import {App} from '@rocket.chat/apps-engine/definition/App'
import {AppCommand} from '../../../internals/AppCommand'
import {HelpCommand} from '../../../internals/HelpCommand'
import {NotificationSubcommand} from './notification/NotificationSubcommand'
import {WeeklyJoinSubcommand} from './WeeklyJoinSubcommand'

export class WeeklySubcommand extends AppCommand {
    public command: string = 'weekly'
    public i18nDescription: string = 'Handle weekly meetings'

    constructor(app: App) {
        super({app})
        this.registerCommand(new NotificationSubcommand(app))
        this.registerCommand(new WeeklyJoinSubcommand())
        this.registerCommand(new HelpCommand(this))
    }
}
