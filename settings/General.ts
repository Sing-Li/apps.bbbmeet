import {
    ISetting,
    SettingType
} from '@rocket.chat/apps-engine/definition/settings'

export const GeneralSettings: Record<string, ISetting> = {
    bbbServer: {
        id: 'BBB_ServerInstanceUrl',
        type: SettingType.STRING,
        i18nLabel: 'Your Big Blue Button instance URL',
        required: true,
        hidden: false,
        public: false,
        packageValue: 'https://demo.bigbluebutton.org',
        section: 'General'
    },
    notificationRooms: {
        id: 'BBB_NotificationRoomNames',
        type: SettingType.STRING,
        i18nLabel: 'Rooms to send notifications regarding BBB actions',
        required: true,
        hidden: false,
        public: false,
        packageValue: 'general',
        section: 'General'
    }
}
