import {
    IHttp,
    IModify,
    IModifyCreator,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {
    BlockBuilder,
    BlockElementType,
    TextObjectType
} from '@rocket.chat/apps-engine/definition/uikit'
import {IUser} from '@rocket.chat/apps-engine/definition/users'
import {AppCommand} from '../../classes/AppCommand'

export class WeeklyJoinSubcommand extends AppCommand {
    public command: string = 'join'

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
        args?: Array<string>
    ): Promise<void> {
        const creator: IModifyCreator = modify.getCreator()
        const blockBuilder: BlockBuilder = modify.getCreator().getBlockBuilder()
        blockBuilder.addSectionBlock({
            text: {
                type: TextObjectType.MARKDOWN,
                text: 'Join the weekly meeting by clicking the "Join" button below'
            }
        })
        blockBuilder.addActionsBlock({
            elements: [
                blockBuilder.newButtonElement({
                    text: {
                        type: TextObjectType.PLAINTEXT,
                        text: 'join'
                    },
                    url: 'https://bbb.rocket.chat/b/adm-1ki-nmm-bfc'
                })
            ]
        })

        await modify.getNotifier().notifyUser(context.getSender(), {
            sender: (await read.getUserReader().getAppUser()) as IUser,
            room: context.getRoom(),
            blocks: blockBuilder.getBlocks()
        })
    }
}
