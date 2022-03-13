import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ApiEndpoint, IApiEndpointInfo, IApiRequest, IApiResponse } from '@rocket.chat/apps-engine/definition/api';

export class WebhookEndpoint extends ApiEndpoint {
    public path = 'webhook';

    public async post(
        request: IApiRequest,
        endpoint: IApiEndpointInfo,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
    ): Promise<IApiResponse> {

        if (request.headers['content-type'] !== 'application/x-www-form-urlencoded') {
            return this.success();
        }

        const data = JSON.parse(request.content?.event)?.data;
        console.log("Data = ", data);
        if(!data || data?.type !== 'event') {
            return this.success();
        }

        switch(data?.id) {
            case 'meeting-ended':
              console.log("Meeting Ended");
              // Send message in desired room upon meeting end.
              break;
            case 'recording-available':
              // Upload recording to video archive.
              break;
            default:
              // Something Maybe
          }


        return this.success();
    }
}
