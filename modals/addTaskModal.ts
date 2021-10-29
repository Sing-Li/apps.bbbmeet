import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { TextObjectType } from '@rocket.chat/apps-engine/definition/uikit/blocks';
import { IUIKitModalViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';
import { ModalsEnum } from '../enum/Modals';
import { AppEnum } from '../enum/App';

export async function addTaskModal({ modify }: { modify: IModify }): Promise<IUIKitModalViewParam> {
	const viewId = ModalsEnum.ADD_TASK_VIEW;
    const block = modify.getCreator().getBlockBuilder();

    block.addInputBlock({
        blockId: ModalsEnum.TASK_BLOCK,
        label: { text: ModalsEnum.TASK_INPUT_LABEL, type: TextObjectType.PLAINTEXT },
        element: block.newPlainTextInputElement({
            actionId: ModalsEnum.TASK_INPUT,
            placeholder: { text: '', type: TextObjectType.PLAINTEXT },
        })
    });

	return {
		id: viewId,
		title: {
			type: TextObjectType.PLAINTEXT,
			text: AppEnum.DEFAULT_TITLE + ' - ' + ModalsEnum.ADD_TASK_TITLE,
		},
        submit: block.newButtonElement({
            text: {
                type: TextObjectType.PLAINTEXT,
                text: 'Add'
            }
        }),
		close: block.newButtonElement({
			text: {
				type: TextObjectType.PLAINTEXT,
				text: 'Close',
			},
		}),
		blocks: block.getBlocks(),
	};
}
