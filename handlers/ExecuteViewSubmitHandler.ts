import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { UIKitViewSubmitInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { ModalsEnum } from '../enum/Modals';
import { sendMessage } from '../lib/message';
import { getRoomTasks, getUIData, persistRoomTasks } from '../lib/persistence';
import { toDoModal } from '../modals/toDoModal';
import { ToDoApp } from '../ToDoApp';

export class ExecuteViewSubmitHandler {
	constructor(
		private readonly app: ToDoApp,
		private readonly read: IRead,
		private readonly http: IHttp,
		private readonly modify: IModify,
		private readonly persistence: IPersistence,
	) {}

	public async run(context: UIKitViewSubmitInteractionContext) {
		const { user, view } = context.getInteractionData();
		switch (view.id) {
            case ModalsEnum.ADD_TASK_VIEW:
                if (user.id) {
                    const { roomId } = await getUIData(this.read.getPersistenceReader(), user.id);
                    if (roomId) {
                        const task = view.state?.[ModalsEnum.TASK_BLOCK]?.[ModalsEnum.TASK_INPUT];
                        const tasks = await getRoomTasks(this.read.getPersistenceReader(), roomId);
                        tasks.push({ task, createdBy: user, createdAt: new Date() });
                        await persistRoomTasks(this.persistence, roomId, tasks);

                        const notification = `@${ user.username } has added "${ task }" to the shared to-do list. Type /todo to view the list of tasks.`;
                        await sendMessage({ app: this.app, read: this.read, modify: this.modify, room: await this.read.getRoomReader().getById(roomId) as IRoom, text: notification });

                        const modal = await toDoModal({ modify: this.modify, read: this.read, persistence: this.persistence, uikitcontext: context });
                        await this.modify.getUiController().updateModalView(modal, { triggerId: context.getInteractionData().triggerId }, context.getInteractionData().user);

                        return context.getInteractionResponder().successResponse();
                    }
                }
                break;
			default:
                break;
		}
		return {
			success: true,
		};
	}
}
