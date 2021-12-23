import {
    IModify,
    IModifyCreator,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {IMessage} from '@rocket.chat/apps-engine/definition/messages'
import {IRoom, RoomType} from '@rocket.chat/apps-engine/definition/rooms'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {IUser} from '@rocket.chat/apps-engine/definition/users'

export async function sendDirectToSender({
    context,
    read,
    modify,
    message
}: {
    context: SlashCommandContext
    read: IRead
    modify: IModify
    message: Omit<IMessage, 'sender' | 'room'>
}) {
    const appUser = (await read.getUserReader().getAppUser()) as IUser
    const usernames: Array<string> = [context.getSender(), appUser].map(
        (user: IUser) => user.username
    )
    const creator: IModifyCreator = modify.getCreator()
    let room: IRoom = await read.getRoomReader().getDirectByUsernames(usernames)
    if (room === undefined) {
        const roomId = await creator.finish(
            creator
                .startRoom()
                .setMembersToBeAddedByUsernames(usernames)
                .setType(RoomType.DIRECT_MESSAGE)
                .setCreator(appUser)
        )
        room = (await read.getRoomReader().getById(roomId)) as IRoom
    }
    await creator.finish(
        creator.startMessage({
            room,
            sender: appUser,
            ...message
        })
    )
}
