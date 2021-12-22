import {
    ISetting,
    SettingType
} from '@rocket.chat/apps-engine/definition/settings'

export const RecurringMeetings: Record<string, ISetting> = {
    weeklyRoomId: {
        id: 'Recurring_Weekly_RoomId',
        type: SettingType.STRING,
        public: false,
        i18nLabel: 'Weekly recurring meeting room ID',
        packageValue: '',
        required: false,
        section: 'Recurring Meetings'
    },
    weeklyDay: {
        id: 'Recurring_Weekly_Day',
        type: SettingType.SELECT,
        public: false,
        i18nLabel: 'Weekly recurring meeting day',
        packageValue: '',
        required: false,
        section: 'Recurring Meetings',
        values: [
            {
                key: 'sunday',
                i18nLabel: 'Sunday'
            },
            {
                key: 'monday',
                i18nLabel: 'Monday'
            },
            {
                key: 'tuesday',
                i18nLabel: 'Tuesday'
            },
            {
                key: 'wednesday',
                i18nLabel: 'Wednesday'
            },
            {
                key: 'thursday',
                i18nLabel: 'Thursday'
            },
            {
                key: 'friday',
                i18nLabel: 'Friday'
            },
            {
                key: 'saturday',
                i18nLabel: 'Saturday'
            }
        ]
    },
    weeklyMeetingTime: {
        id: 'Weekly_Recurring_MeetingTime',
        type: SettingType.STRING,
        packageValue: '',
        public: false,
        i18nLabel: 'Weekly recurring meeting time of day',
        i18nDescription: '',
        required: false,
        section: 'Recurring Meetings'
    }
    // TODO: add more like monthly, daily, etc.
}
