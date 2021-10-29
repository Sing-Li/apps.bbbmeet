import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IApp } from '@rocket.chat/apps-engine/definition/IApp';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUIKitResponse, TextObjectType, UIKitBlockInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { ModalsEnum } from '../enum/Modals';
import { sendMessage } from '../lib/message';
import { getRoomTasks, getUIData, persistRoomTasks } from '../lib/persistence';
import { addTaskModal } from '../modals/addTaskModal';
import { completedTasksModal } from '../modals/completedTasksModal';
import { toDoModal } from '../modals/toDoModal';

export class ExecuteBlockActionHandler {
    constructor(
        private readonly app: IApp,
        private readonly read: IRead,
        private readonly http: IHttp,
        private readonly modify: IModify,
        private readonly persistence: IPersistence,
    ) {}

    public async run(context: UIKitBlockInteractionContext): Promise<IUIKitResponse> {
        const contextData = context.getInteractionData();
        const { user } = contextData;
        const roomId = (await getUIData(this.read.getPersistenceReader(), user.id)).roomId;

        let { actionId, value = '' } = contextData;
        let subAction = '';
        if (value.indexOf('#') !== -1) {
            [subAction, value] = value.split('#')
        }

        switch (actionId) {
            case ModalsEnum.ADD_TASK_ACTION: {
                const taskModal = await addTaskModal({ modify: this.modify });
                return context.getInteractionResponder().openModalViewResponse(taskModal);
            }
            case ModalsEnum.COMPLETED_TASKS_ACTION: {
                const completedModal = await completedTasksModal({ modify: this.modify, read: this.read, context });
                return context.getInteractionResponder().openModalViewResponse(completedModal);
            }
            case ModalsEnum.TASK_COMPLETE_ACTION: {
                const tasks = await getRoomTasks(this.read.getPersistenceReader(), roomId);
                tasks[value].complete = true;
                tasks[value].completedBy = user;
                tasks[value].completedAt = new Date();
                await persistRoomTasks(this.persistence, roomId, tasks);

                const notification = `@${ user.username } has completed the task "${ tasks[value].task }". Type /todo to view the list of tasks.`;
                await sendMessage({ app: this.app, read: this.read, modify: this.modify, room: await this.read.getRoomReader().getById(roomId) as IRoom, text: notification });

                const modal = await toDoModal({ modify: this.modify, read: this.read, persistence: this.persistence, uikitcontext: context });
                await this.modify.getUiController().updateModalView(modal, { triggerId: context.getInteractionData().triggerId }, context.getInteractionData().user);
                break;
            }
            case ModalsEnum.TASK_UNDO_ACTION: {
                    const tasks = await getRoomTasks(this.read.getPersistenceReader(), roomId);
                    tasks[value].complete = false;
                    await persistRoomTasks(this.persistence, roomId, tasks);

                    const notification = `@${ user.username } has undone task "${ tasks[value].task }. Type /todo to view the list of tasks.`;
                    await sendMessage({ app: this.app, read: this.read, modify: this.modify, room: await this.read.getRoomReader().getById(roomId) as IRoom, text: notification });

                    const completedModal = await completedTasksModal({ modify: this.modify, read: this.read, context });
                    await this.modify.getUiController().updateModalView(completedModal, { triggerId: context.getInteractionData().triggerId }, context.getInteractionData().user);
                    break;
            }
            case ModalsEnum.REFRESH_ACTION: {
                    const modal = await toDoModal({ modify: this.modify, read: this.read, persistence: this.persistence, uikitcontext: context });
                    await this.modify.getUiController().updateModalView(modal, { triggerId: context.getInteractionData().triggerId }, context.getInteractionData().user);
                    break;
            }
        }
        return context.getInteractionResponder().successResponse();
    }
}
