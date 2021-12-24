import {App} from '@rocket.chat/apps-engine/definition/App'
import {AppCommand} from '../../classes/AppCommand'
import {WeeklyJoinSubcommand} from './WeeklyJoinSubcommand'

export class WeeklySubcommand extends AppCommand {
    public command: string = 'weekly'

    constructor(app: App) {
        super(app)
        this.registerCommand(new WeeklyJoinSubcommand(this.app))
    }
}
