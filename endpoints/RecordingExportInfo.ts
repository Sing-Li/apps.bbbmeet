import {
    HttpStatusCode,
    IHttp,
    IModify,
    IPersistence,
    IRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {
    ApiEndpoint,
    IApiEndpointInfo,
    IApiRequest,
    IApiResponse
} from '@rocket.chat/apps-engine/definition/api'
import {IRoom} from '@rocket.chat/apps-engine/definition/rooms'
import {IUser} from '@rocket.chat/apps-engine/definition/users'
import {getNotificationRooms} from '../functions/settings'

export class RecordingExportInfo extends ApiEndpoint {
    public path: string = 'recording'

    public async post(
        request: IApiRequest,
        endpoint: IApiEndpointInfo,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<IApiResponse> {
        const [{data}] = JSON.parse(request.content.event)
        if (data.id !== 'rap-publish-ended' || data.attributes.workflow !== 'presentation_video') {
            // we don't care about these events at the moment
            return {
                status: HttpStatusCode.OK
            }
        }
        const c = modify.getCreator()
        const m = c
            .startMessage()
            .setSender((await read.getUserReader().getAppUser()) as IUser)
            .setText(data.attributes.recording.playback.link)
        for (const room of (await getNotificationRooms(
            this.app.getLogger(),
            read
        )) as Array<IRoom>) {
            m.setRoom(room)
            await c.finish(m)
        }
        return {
            status: HttpStatusCode.OK
        }
    }
}

/*
https://6689-2405-201-8011-406b-500c-911-3c4d-e815.ngrok.io/api/apps/public/0eda31f4-49f9-4596-ae47-329feb526741/recording
*/
