import {IAppAccessors} from '@rocket.chat/apps-engine/definition/accessors'
import {
    ISetting,
    ISettingSelectValue
} from '@rocket.chat/apps-engine/definition/settings'

export interface IAppSetting {
    setting: ISetting
    errorMessage?: string
    validFunc?: (value: any, accessors?: IAppAccessors) => Promise<boolean>
    valueSourceFunc?: (accessors: IAppAccessors) => Promise<any>
    valuesSourceFunc?: (
        accessors: IAppAccessors
    ) => Promise<Array<ISettingSelectValue>>
}
