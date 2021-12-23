import {App} from '@rocket.chat/apps-engine/definition/App'
import {AppCommand} from '../../internals/AppCommand'
import {HelpCommand} from '../../internals/HelpCommand'
import {WeeklySubcommand} from './weekly/WeeklySubcommand'

export class RecurringSubcommand extends AppCommand {
    public command: string = 'recurring'
    public i18nDescription: string =
        'Handle recurring meeting resources/activities'

    constructor(app: App) {
        super({app})
        this.registerCommand(new WeeklySubcommand(app))
        this.registerCommand(new HelpCommand(this))
    }
}
