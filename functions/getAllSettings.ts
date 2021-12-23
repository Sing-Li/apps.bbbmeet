import {IAppAccessors} from '@rocket.chat/apps-engine/definition/accessors'
import {SettingType} from '@rocket.chat/apps-engine/definition/settings'
import {IAppSetting} from '../interfaces/IAppSettings'
import {GeneralSettings} from '../settings/General'
import {RecurringMeetings} from '../settings/RecurringMeetings'

export async function* getAllSettings(accessors: IAppAccessors) {
    const settings: Array<Record<string, IAppSetting>> = [GeneralSettings, RecurringMeetings]
    for (const appSetting of settings) {
        for (const setting of Object.values(appSetting)) {
            switch (setting.setting.type) {
                case SettingType.SELECT: {
                    if (setting.valuesSourceFunc) {
                        setting.setting.values = await setting.valuesSourceFunc(accessors)
                    }
                    break
                }
                default: {
                    if (setting.valueSourceFunc) {
                        setting.setting.value = await setting.valueSourceFunc(accessors)
                    }
                    break
                }
            }
            yield setting.setting
        }
    }
}
