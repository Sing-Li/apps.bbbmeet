import {IModify, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {IMessage} from '@rocket.chat/apps-engine/definition/messages'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {IUser} from '@rocket.chat/apps-engine/definition/users'

export async function notifySender({
    context,
    read,
    modify,
    message
}: {
    context: SlashCommandContext
    modify: IModify
    read: IRead
    message: Omit<IMessage, 'sender' | 'room'>
}): Promise<void> {
    await modify.getNotifier().notifyUser(context.getSender(), {
        room: context.getRoom(),
        sender: (await read.getUserReader().getAppUser()) as IUser,
        ...message
    })
}
