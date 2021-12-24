import {
    ISetting,
    SettingType
} from '@rocket.chat/apps-engine/definition/settings'

export const RecurringMeetings: Record<string, ISetting> = {
    weekly: {
        id: 'Recurring_Weekly_RoomUrl',
        type: SettingType.STRING,
        public: false,
        i18nLabel: 'Weekly recurring meeting room url',
        packageValue: '',
        required: false
    }
    // TODO: add more like monthly, daily, etc.
}
