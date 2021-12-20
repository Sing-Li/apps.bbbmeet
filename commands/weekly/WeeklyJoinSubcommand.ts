import {
    IHttp,
    IModify,
    IModifyCreator,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {IUser} from '@rocket.chat/apps-engine/definition/users'
import {AppCommand} from '../../classes'

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
        await creator.finish(
            creator.startMessage({
                text: 'join',
                sender: (await read.getUserReader().getAppUser()) as IUser,
                room: context.getRoom()
            })
        )
    }
}
