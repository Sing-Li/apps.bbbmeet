import {
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {
    BlockBuilder,
    TextObjectType
} from '@rocket.chat/apps-engine/definition/uikit'
import {IUser} from '@rocket.chat/apps-engine/definition/users'
import {getWeeklyMeetingDetails} from '../../../functions/getWeeklyDetails'
import {AppCommand} from '../../../internals/AppCommand'
import {HelpCommand} from '../../../internals/HelpCommand'

export class WeeklyJoinSubcommand extends AppCommand {
    public command: string = 'join'
    public i18nDescription: string = 'Join weekly meeting'

    constructor() {
        super({})
        this.registerCommand(new HelpCommand(this))
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
        args?: Array<string>
    ): Promise<void> {
        const [bbbServer, weeklyRoomId]: Array<string> =
            await getWeeklyMeetingDetails(
                {context, read, modify},
                this.getApp().getAccessors()
            )
        const blockBuilder: BlockBuilder = modify.getCreator().getBlockBuilder()
        blockBuilder.addSectionBlock({
            text: {
                type: TextObjectType.PLAINTEXT,
                text: 'Join the weekly meeting by clicking the "Join" button below'
            }
        })
        blockBuilder.addActionsBlock({
            elements: [
                blockBuilder.newButtonElement({
                    text: {
                        type: TextObjectType.PLAINTEXT,
                        text: 'Join'
                    },
                    url: `${bbbServer.replace(/\/$/, '')}/b/${weeklyRoomId}`
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
