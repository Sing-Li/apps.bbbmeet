import {
    IAppAccessors,
    IConfigurationExtend,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { IUIKitInteractionHandler, IUIKitResponse, UIKitBlockInteractionContext, UIKitViewCloseInteractionContext, UIKitViewSubmitInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { ToDoCommand } from './commands/ToDoCommand';
import { ExecuteBlockActionHandler } from './handlers/ExecuteBlockActionHandler';
import { ExecuteViewClosedHandler } from './handlers/ExecuteViewClosedHandler';
import { ExecuteViewSubmitHandler } from './handlers/ExecuteViewSubmitHandler';

export class ToDoApp extends App implements IUIKitInteractionHandler {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    /*
    Extend Configuration
    Adds settings
    Sets up API endpoints
    Adds slashcommands
    Sets up the scheduler startup settings and processors
    */
    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
        // SlashCommands:
        await configuration.slashCommands.provideSlashCommand(new ToDoCommand(this));
    }

    /* UIKit Interaction Handlers */
    // UIKit action handler
    // Runs when the user clicks a uikit action button (not close/submit buttons), or changes something on an action block within a modal view
    public async executeBlockActionHandler(context: UIKitBlockInteractionContext, read: IRead, http: IHttp, persistence: IPersistence, modify: IModify): Promise<IUIKitResponse> {
        const handler = new ExecuteBlockActionHandler(this, read, http, modify, persistence);
        return await handler.run(context);
    }


    // UIKit Modal Submit
    public async executeViewSubmitHandler(context: UIKitViewSubmitInteractionContext, read: IRead, http: IHttp, persistence: IPersistence, modify: IModify) {
        const handler = new ExecuteViewSubmitHandler(this, read, http, modify, persistence);
        return await handler.run(context);
	}

    // UIKit Modal Close
    public async executeViewClosedHandler(context: UIKitViewCloseInteractionContext, read: IRead, http: IHttp, persistence: IPersistence, modify: IModify) {
        const handler = new ExecuteViewClosedHandler(this, read, http, modify, persistence);
        return await handler.run(context);
    }
}
