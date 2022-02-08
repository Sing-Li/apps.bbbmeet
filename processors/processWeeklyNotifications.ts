import {IModify, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {IRoom} from '@rocket.chat/apps-engine/definition/rooms'
import {TextObjectType} from '@rocket.chat/apps-engine/definition/uikit'
import {IUser} from '@rocket.chat/apps-engine/definition/users'

export const processWeeklyNotification = async ({
    modify,
    read,
    bbbRoomUrl,
    notificationRooms
}: {
    modify: IModify
    read: IRead
    bbbRoomUrl: string
    notificationRooms: Array<IRoom>
}): Promise<void> => {
    const c = modify.getCreator()
    const b = c.getBlockBuilder()

    b.addSectionBlock({
        text: {
            type: TextObjectType.PLAINTEXT,
            text: 'Join the weekly meeting by clicking the "Join" button below'
        }
    })
    b.addActionsBlock({
        elements: [
            b.newButtonElement({
                text: {
                    type: TextObjectType.PLAINTEXT,
                    text: 'Join'
                },
                url: bbbRoomUrl
            })
        ]
    })

    for (const room of notificationRooms) {
        // send message to each configured room
        await c.finish(
            c
                .startMessage()
                .setSender((await read.getUserReader().getAppUser()) as IUser)
                .setRoom(room)
                .addBlocks(b.getBlocks())
        )
    }
}
