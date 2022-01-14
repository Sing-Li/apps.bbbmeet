import {ISetting, SettingType} from '@rocket.chat/apps-engine/definition/settings'

export const WeeklySettings: Record<string, ISetting> = {
    meetingId: {
        id: 'Weekly_MeetingID',
        i18nLabel: 'Weekly Meeting Room ID',
        packageValue: '',
        type: SettingType.STRING,
        public: true,
        required: true
    },
    dayOfWeek: {
        id: 'Weekly_MeetingDayOfWeek',
        i18nLabel: 'Weekly Meeting Day',
        packageValue: '',
        type: SettingType.SELECT,
        public: true,
        required: true,
        values: [
            {key: 'sunday', i18nLabel: 'Sunday'},
            {key: 'monday', i18nLabel: 'Monday'},
            {key: 'tuesday', i18nLabel: 'Tuesday'},
            {key: 'wednesday', i18nLabel: 'Wednesday'},
            {key: 'thursday', i18nLabel: 'Thursday'},
            {key: 'friday', i18nLabel: 'Friday'},
            {key: 'saturday', i18nLabel: 'Saturday'}
        ]
    },
    time: {
        id: 'Weekly_MeetingTime',
        i18nLabel: 'Weekly Meeting Time (in 24 hours or 12 hours format)',
        packageValue: '',
        type: SettingType.STRING,
        public: true,
        required: true
    },
    notificationRooms: {
        id: 'Weekly_MeetingNotificationRoom',
        i18nLabel: 'Weekly Meeting Notification Rooms',
        packageValue: 'general',
        type: SettingType.STRING,
        public: true,
        required: true
    }
}
