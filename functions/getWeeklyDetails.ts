import {IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {GeneralSettings} from '../settings/General'
import {RecurringMeetings} from '../settings/RecurringMeetings'

export async function getWeeklyMeetingDetails(
    read: IRead,
    callback: (errorMessage: string) => Promise<any>
): Promise<Array<string>> {
    const server: string = await read
        .getEnvironmentReader()
        .getSettings()
        .getValueById(GeneralSettings.bbbServer.id)
    if (server.match(/^\s*$/) !== null) {
        await callback(
            'BBB server details not found, please set them in app settings'
        )
    }
    const weeklyRoomId: string = await read
        .getEnvironmentReader()
        .getSettings()
        .getValueById(RecurringMeetings.weeklyRoomId.id)
    if (weeklyRoomId.match(/^\s*$/) !== null) {
        await callback(
            'Weekly meeting room Id not found, please set them in app settings'
        )
    }
    return [server, weeklyRoomId]
}
