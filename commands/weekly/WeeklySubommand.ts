import {App} from '@rocket.chat/apps-engine/definition/App'
import {WeeklyJoinSubcommand} from '..'
import {AppCommand} from '../../classes'

export class WeeklySubcommand extends AppCommand {
    public command: string = 'weekly'

    constructor(app: App) {
        super(app)
        this.registerCommand(new WeeklyJoinSubcommand(this.app))
    }
}
