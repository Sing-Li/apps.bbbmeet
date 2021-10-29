import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { TextObjectType } from '@rocket.chat/apps-engine/definition/uikit/blocks';
import { IUIKitModalViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';
import { ModalsEnum } from '../enum/Modals';
import { AppEnum } from '../enum/App';
import { getRoomTasks, getUIData } from '../lib/persistence';
import { UIKitBlockInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';

export async function taskInfoModal({ modify, read, taskId, context }: { modify: IModify, read: IRead, taskId: string, context: UIKitBlockInteractionContext }): Promise<IUIKitModalViewParam> {
	const viewId = ModalsEnum.TASK_INFO_VIEW;

    const roomId = (await getUIData(read.getPersistenceReader(), context.getInteractionData().user.id)).roomId;
    const tasks = await getRoomTasks(read.getPersistenceReader(), roomId);
    const task = tasks[taskId];

    const block = modify.getCreator().getBlockBuilder();
    block.addSectionBlock({
        text: {
            text: `Task: ${task.task}`,
            type: TextObjectType.MARKDOWN
        }
    });
    block.addSectionBlock({
        text: {
            text: `Created by: @${task.createdBy.username}`,
            type: TextObjectType.MARKDOWN
        }
    });
    block.addSectionBlock({
        text: {
            text: `Created at: ${task.createdAt.toISOString().split('T')[0]}`,
            type: TextObjectType.MARKDOWN
        }
    });

    if (task.complete) {
        block.addSectionBlock({
            text: {
                text: `Completed by: @${task.completedBy.username}`,
                type: TextObjectType.MARKDOWN
            }
        });
        block.addSectionBlock({
            text: {
                text: `Completed at: ${task.completedAt.toISOString().split('T')[0]}`,
                type: TextObjectType.MARKDOWN
            }
        });
    }

	return {
		id: viewId,
		title: {
			type: TextObjectType.PLAINTEXT,
			text: AppEnum.DEFAULT_TITLE + ' - ' + ModalsEnum.TASK_INFO_TITLE,
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
