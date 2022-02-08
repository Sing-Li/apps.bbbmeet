import {IModify, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {IMessage} from '@rocket.chat/apps-engine/definition/messages'
import {IRoom, RoomType} from '@rocket.chat/apps-engine/definition/rooms'
import {IUser} from '@rocket.chat/apps-engine/definition/users'

const sendToDirectMessage = async ({
    modify,
    read,
    user,
    message
}: {
    modify: IModify
    read: IRead
    user: IUser
    message: Omit<IMessage, 'sender' | 'room'>
}): Promise<void> => {
    const c = modify.getCreator()

    const me = (await read.getUserReader().getAppUser()) as IUser
    const usernames = [me.username, user.username]

    let room: IRoom = await read.getRoomReader().getDirectByUsernames(usernames)
    if (room === undefined) {
        const rid = await c.finish(
            c
                .startRoom()
                .setCreator(me)
                .setType(RoomType.DIRECT_MESSAGE)
                .setMembersToBeAddedByUsernames(usernames)
        )
        room = (await read.getRoomReader().getById(rid)) as IRoom
    }

    await c.finish(
        c.startMessage({
            sender: me,
            room,
            ...message
        })
    )
}

const notifyUser = async ({
    modify,
    read,
    user,
    room,
    message
}: {
    modify: IModify
    read: IRead
    user: IUser
    room: IRoom
    message: Omit<IMessage, 'sender' | 'room'>
}): Promise<void> => {
    await modify.getNotifier().notifyUser(user, {
        sender: (await read.getUserReader().getAppUser()) as IUser,
        room,
        ...message
    })
}

export {sendToDirectMessage, notifyUser}
