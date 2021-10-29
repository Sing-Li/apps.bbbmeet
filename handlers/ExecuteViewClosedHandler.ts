import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IApp } from '@rocket.chat/apps-engine/definition/IApp';
import { UIKitViewCloseInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { ModalsEnum } from '../enum/Modals';
import { toDoModal } from '../modals/toDoModal';

export class ExecuteViewClosedHandler {
    constructor(
        private readonly app: IApp,
        private readonly read: IRead,
        private readonly http: IHttp,
        private readonly modify: IModify,
        private readonly persistence: IPersistence,
    ) {}

    public async run(context: UIKitViewCloseInteractionContext) {
        const { view } = context.getInteractionData();
        switch (view.id) {
            case ModalsEnum.COMPLETED_TASKS_VIEW:
                const modal = await toDoModal({ modify: this.modify, read: this.read, persistence: this.persistence, uikitcontext: context });
                await this.modify.getUiController().updateModalView(modal, { triggerId: context.getInteractionData().triggerId as string }, context.getInteractionData().user);
                break;
        }
        return { success: true } as any;
    }
}
