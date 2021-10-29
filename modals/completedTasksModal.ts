import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { TextObjectType } from '@rocket.chat/apps-engine/definition/uikit/blocks';
import { IUIKitModalViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';
import { ModalsEnum } from '../enum/Modals';
import { AppEnum } from '../enum/App';
import { getRoomTasks, getUIData } from '../lib/persistence';
import { UIKitBlockInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';

export async function completedTasksModal({ modify, read, context }: { modify: IModify, read: IRead, context: UIKitBlockInteractionContext }): Promise<IUIKitModalViewParam> {
	const viewId = ModalsEnum.COMPLETED_TASKS_VIEW;

    const roomId = (await getUIData(read.getPersistenceReader(), context.getInteractionData().user.id)).roomId;
    const tasks = await getRoomTasks(read.getPersistenceReader(), roomId);
    const block = modify.getCreator().getBlockBuilder();

    for (const taskId in tasks) {
        const task = tasks[taskId];
        if (task.complete) {
            block.addSectionBlock({
                text: { text: task.task, type: TextObjectType.PLAINTEXT },
                accessory: block.newButtonElement({
                    actionId: ModalsEnum.TASK_UNDO_ACTION,
                    text: {
                        text: ModalsEnum.TASK_UNDO_LABEL,
                        type: TextObjectType.PLAINTEXT
                    },
                    value: taskId
                })
            });
            block.addContextBlock({ elements: [ block.newPlainTextObject(`\Created by: @${task.createdBy.username} on ${task.createdAt.toISOString().split('T')[0] }`) ] });
            block.addContextBlock({ elements: [ block.newPlainTextObject(`\nCompleted by: @${task.completedBy.username} on ${task.completedAt.toISOString().split('T')[0] }`) ] });
        }
    }

	return {
		id: viewId,
		title: {
			type: TextObjectType.PLAINTEXT,
			text: AppEnum.DEFAULT_TITLE + ' - ' + ModalsEnum.COMPLETED_TASKS_TITLE,
		},
		close: block.newButtonElement({
			text: {
				type: TextObjectType.PLAINTEXT,
				text: 'Close',
			},
		}),
		blocks: block.getBlocks(),
	};
}
