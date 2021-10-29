import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { ToDoApp } from '../ToDoApp';
import { toDoModal } from '../modals/toDoModal';


export class ToDoCommand implements ISlashCommand {
    public command = 'todo';
    public i18nParamsExample = 'Params';
    public i18nDescription = 'Description';
    public providesPreview = false;

    constructor(private readonly app: ToDoApp) { }
    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persistence: IPersistence): Promise<void> {
        const triggerId = context.getTriggerId();
        if (triggerId) {
            try {
                const modal = await toDoModal({ read, modify, persistence, slashcommandcontext: context });
                await modify.getUiController().openModalView(modal, { triggerId }, context.getSender());
            } catch (error) {
                console.log(error);
            }
        }
    }
}
