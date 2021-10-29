import { IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { TextObjectType } from '@rocket.chat/apps-engine/definition/uikit/blocks';
import { IUIKitModalViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { ModalsEnum } from '../enum/Modals';
import { AppEnum } from '../enum/App';
import { getRoomTasks, getUIData, persistUIData } from '../lib/persistence';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { UIKitBlockInteractionContext, UIKitInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';

export async function toDoModal({ modify, read, persistence, slashcommandcontext, uikitcontext }: { modify: IModify, read: IRead, persistence: IPersistence, slashcommandcontext?: SlashCommandContext, uikitcontext?: UIKitInteractionContext }): Promise<IUIKitModalViewParam> {
	const viewId = ModalsEnum.TODO_VIEW;

    const block = modify.getCreator().getBlockBuilder();

    const room = slashcommandcontext?.getRoom() || uikitcontext?.getInteractionData().room;
    const user = slashcommandcontext?.getSender() || uikitcontext?.getInteractionData().user;
    if (user?.id) {
        let roomId;
        if (room?.id) {
            roomId = room.id;
            await persistUIData(persistence, user.id, { roomId });
        } else {
            roomId = (await getUIData(read.getPersistenceReader(), user.id)).roomId;
        }
        const tasks = await getRoomTasks(read.getPersistenceReader(), roomId);
        for (const taskId in tasks) {
            const task = tasks[taskId];
            if (!task.complete) {
                block.addSectionBlock({
                    text: { text: task.task, type: TextObjectType.PLAINTEXT },
                    // accessory: block.newOverflowMenuElement({
                    //     actionId: ModalsEnum.TASK_ACTIONS,
                    //     options: [
                    //         { text: { text: ModalsEnum.TASK_INFO_LABEL, type: TextObjectType.PLAINTEXT }, value: `${ ModalsEnum.TASK_INFO_ACTION }#${taskId}` },
                    //         { text: { text: ModalsEnum.TASK_MARK_COMPLETE_LABEL, type: TextObjectType.PLAINTEXT }, value: `${ ModalsEnum.TASK_COMPLETE_ACTION }#${taskId}` },
                    //     ]
                    // })
                    accessory: block.newButtonElement({
                        actionId: ModalsEnum.TASK_COMPLETE_ACTION,
                        text: {
                            text: ModalsEnum.TASK_MARK_COMPLETE_LABEL,
                            type: TextObjectType.PLAINTEXT
                        },
                        value: taskId
                    })
                });
                block.addContextBlock({ elements: [ block.newPlainTextObject(`\Created by: @${task.createdBy.username} on ${task.createdAt.toISOString().split('T')[0] }`) ] });
            }
        }
    }

    block.addDividerBlock();

    block.addActionsBlock({
        elements: [
            block.newButtonElement({
                actionId: ModalsEnum.ADD_TASK_ACTION,
                text: { text: ModalsEnum.ADD_TASK_LABEL, type: TextObjectType.PLAINTEXT },
                value: room?.id
            }),
            block.newButtonElement({
                actionId: ModalsEnum.COMPLETED_TASKS_ACTION,
                text: { text: ModalsEnum.COMPLETED_TASKS_LABEL, type: TextObjectType.PLAINTEXT },
                value: room?.id
            }),
            block.newButtonElement({
                actionId: ModalsEnum.REFRESH_ACTION,
                text: { text: ModalsEnum.REFRESH_LABEL, type: TextObjectType.PLAINTEXT },
                value: room?.id
            }),
        ]
    });

	return {
		id: viewId,
		title: {
			type: TextObjectType.PLAINTEXT,
			text: AppEnum.DEFAULT_TITLE,
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
