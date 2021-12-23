import {IAppAccessors} from '@rocket.chat/apps-engine/definition/accessors'
import {ISettingSelectValue, SettingType} from '@rocket.chat/apps-engine/definition/settings'
import {IAppSetting} from '../interfaces/IAppSettings'

export const RecurringMeetings: Record<string, IAppSetting> = {
    weeklyRoomId: {
        setting: {
            id: 'Recurring_Weekly_RoomId',
            type: SettingType.STRING,
            public: false,
            i18nLabel: 'Weekly recurring meeting room ID',
            packageValue: '',
            required: false,
            section: 'Recurring Meetings'
        },
        validFunc: async (value: string): Promise<boolean> => value.match(/^\s*$/) !== null,
        errorMessage: 'invalid weekly meeting room ID given'
    },
    weeklyDay: {
        setting: {
            id: 'Recurring_Weekly_Day',
            type: SettingType.SELECT,
            public: false,
            i18nLabel: 'Weekly recurring meeting day',
            packageValue: '',
            required: false,
            section: 'Recurring Meetings'
        },
        valuesSourceFunc: async (accessors: IAppAccessors): Promise<Array<ISettingSelectValue>> =>
            ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((element: string) => {
                return {
                    key: element,
                    i18nLabel: element[0].toLocaleUpperCase().concat(element.substring(1))
                }
            }),
        errorMessage: 'invalid weekly day set'
    },
    weeklyMeetingTime: {
        setting: {
            id: 'Weekly_Recurring_MeetingTime',
            type: SettingType.STRING,
            packageValue: '',
            public: false,
            i18nLabel: 'Weekly recurring meeting time of day',
            i18nDescription: '',
            required: false,
            section: 'Recurring Meetings'
        },
        errorMessage: 'invalid meeting time set',
        validFunc: async (value: string): Promise<boolean> => value.match(/^ *[0-23]:[0-59] +[aApP][mM] *$/) !== null
    }
    // TODO: add more like monthly, daily, etc.
}
