import {App} from '@rocket.chat/apps-engine/definition/App'
import {AppCommand} from '../../internals/AppCommand'
import {HelpCommand} from '../../internals/HelpCommand'
import {GetSettingsSubcommand} from './GetSettingsSubcommand'

export class GetSubcommand extends AppCommand {
    public command: string = 'get'
    public i18nDescription: string = 'Show app resources'

    constructor(app: App) {
        super({app})
        this.registerCommand(new GetSettingsSubcommand(app))
        this.registerCommand(new HelpCommand(this))
    }
}
