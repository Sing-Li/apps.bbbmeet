import {IAppAccessors, IModify, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {GeneralSettings} from '../settings/General'
import {RecurringMeetings} from '../settings/RecurringMeetings'
import {errorSettingCallback} from './errorSettingCallback'
import {getSettingValue} from './getSetting'

export async function getWeeklyMeetingDetails(
    {context, read, modify}: {context: SlashCommandContext; read: IRead; modify: IModify},
    accessors: IAppAccessors
): Promise<Array<string>> {
    const server: string = await getSettingValue(
        accessors,
        GeneralSettings.bbbServer,
        errorSettingCallback,
        {
            context,
            read,
            modify,
            message: {text: GeneralSettings.bbbServer.errorMessage}
        }
    )
    // RecurringMeetings.weeklyRoomId
    const weeklyRoomId: string = await getSettingValue(
        accessors,
        RecurringMeetings.weeklyRoomId,
        errorSettingCallback,
        {
            context,
            read,
            modify,
            message: {text: RecurringMeetings.weeklyRoomId.errorMessage}
        }
    )
    return [server, weeklyRoomId]
}
