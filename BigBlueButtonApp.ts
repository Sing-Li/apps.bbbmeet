import {
    IAppAccessors,
    IAppInstallationContext,
    IConfigurationExtend,
    IConfigurationModify,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {ApiSecurity, ApiVisibility} from '@rocket.chat/apps-engine/definition/api'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {IAppInfo} from '@rocket.chat/apps-engine/definition/metadata'
import {IRoom} from '@rocket.chat/apps-engine/definition/rooms'
import {ISetting} from '@rocket.chat/apps-engine/definition/settings'
import {RecordingExportInfo} from './endpoints/RecordingExportInfo'
import {RecurringNotificationJobs} from './enums/RecurringNotificationJobs'
import {getCronExpression, getNotificationRooms, getWeeklyData} from './functions/settings'
import {processWeeklyNotification} from './processors/processWeeklyNotifications'
import {GeneralSettings} from './settings/General'
import {WeeklySettings} from './settings/Weekly'

export default class BigBlueButton extends App {
    // tslint:disable-next-line: variable-name
    private _modify: IModify

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors)
    }

    public async onInstall(
        context: IAppInstallationContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<void> {
        // hack :/
        this._modify = modify
    }

    public async onSettingUpdated(
        setting: ISetting,
        configurationModify: IConfigurationModify,
        read: IRead,
        http: IHttp
    ): Promise<void> {
        // disable existing job
        configurationModify.scheduler.cancelJob(RecurringNotificationJobs.WEEKLY)

        const l = this.getLogger()
        const bbbRoomUrl = await getWeeklyData(l, read)
        const notificationRooms = await getNotificationRooms(l, read)

        if (bbbRoomUrl !== undefined && notificationRooms !== undefined) {
            configurationModify.scheduler.scheduleRecurring({
                id: RecurringNotificationJobs.WEEKLY,
                interval: (await getCronExpression(l, read)) as string,
                skipImmediate: true,
                data: {modify: this._modify, read, bbbRoomUrl, notificationRooms}
            })
        }
    }

    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
        const allSettings: Array<Record<string, ISetting>> = [GeneralSettings, WeeklySettings]

        await Promise.all(
            allSettings.map((settingRecord: Record<string, ISetting>) =>
                Object.values(settingRecord).map((s: ISetting) =>
                    configuration.settings.provideSetting(s)
                )
            )
        )

        await configuration.api.provideApi({
            visibility: ApiVisibility.PUBLIC,
            security: ApiSecurity.UNSECURE,
            endpoints: [new RecordingExportInfo(this)]
        })

        await configuration.scheduler.registerProcessors([
            {
                id: RecurringNotificationJobs.WEEKLY,
                processor: processWeeklyNotification
            }
        ])
    }
}
