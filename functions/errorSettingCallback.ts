import {IModify, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {IAppSetting} from '../interfaces/IAppSettings'
import {notifySender} from './notifySender'

export async function errorSettingCallback({
    context,
    read,
    modify,
    setting
}: {
    context: SlashCommandContext
    read: IRead
    modify: IModify
    setting: IAppSetting
}): Promise<void> {
    await notifySender({
        context,
        read,
        modify,
        message: {text: setting.errorMessage}
    })
    throw new Error(setting.errorMessage)
}
