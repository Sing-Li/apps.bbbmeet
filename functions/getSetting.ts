import {IAppAccessors} from '@rocket.chat/apps-engine/definition/accessors'
import {IAppSetting} from '../interfaces/IAppSettings'

export async function getSettingValue(
    accessors: IAppAccessors,
    setting: IAppSetting,
    errorCallback: (args?: any) => Promise<void>,
    errorCallbackArgs?: any
): Promise<any> {
    const value: any = await accessors.reader
        .getEnvironmentReader()
        .getSettings()
        .getValueById(setting.setting.id)
    if (setting.validFunc && !(await setting.validFunc(value, accessors))) {
        return await errorCallback(errorCallbackArgs)
    }
    return value
}
