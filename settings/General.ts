import {IAppAccessors} from '@rocket.chat/apps-engine/definition/accessors'
import {SettingType} from '@rocket.chat/apps-engine/definition/settings'
import {IAppSetting} from '../interfaces/IAppSettings'

export const GeneralSettings: Record<string, IAppSetting> = {
    bbbServer: {
        setting: {
            id: 'BBB_ServerInstanceUrl',
            type: SettingType.STRING,
            i18nLabel: 'Your Big Blue Button instance URL',
            required: true,
            hidden: false,
            public: false,
            packageValue: 'https://demo.bigbluebutton.org',
            section: 'General'
        },
        validFunc: async (value: string): Promise<boolean> => value.match(/^\s*$/) !== null,
        errorMessage: 'invalid Big Blue Button server instance URL'
    },
    notificationRooms: {
        setting: {
            id: 'BBB_NotificationRoomNames',
            type: SettingType.STRING,
            i18nLabel: 'Rooms to send notifications regarding BBB actions',
            required: true,
            hidden: false,
            public: false,
            packageValue: 'general',
            section: 'General'
        },
        validFunc: async (value: string, accessors: IAppAccessors): Promise<boolean> =>
            (await accessors.reader.getRoomReader().getByName(value)) !== undefined,
        errorMessage: 'configured notification room not found'
    }
}
