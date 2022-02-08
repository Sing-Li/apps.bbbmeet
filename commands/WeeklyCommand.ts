import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
    ISettingRead
} from '@rocket.chat/apps-engine/definition/accessors'
import {App} from '@rocket.chat/apps-engine/definition/App'
import {IMessage} from '@rocket.chat/apps-engine/definition/messages'
import {IRoom, RoomType} from '@rocket.chat/apps-engine/definition/rooms'
import {IRecurringSchedule} from '@rocket.chat/apps-engine/definition/scheduler'
import {ISlashCommand, SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands'
import {TextObjectType} from '@rocket.chat/apps-engine/definition/uikit'
import {IUser} from '@rocket.chat/apps-engine/definition/users'
import {RecurringNotificationJobs} from '../enums/RecurringNotificationJobs'
import {notifyUser, sendToDirectMessage} from '../functions/comms'
import {getCronExpression, getNotificationRooms, getWeeklyData} from '../functions/settings'
import {WeeklySettings} from '../settings/Weekly'

export class WeeklyCommand implements ISlashCommand {
    public command: string = 'weekly'
    public i18nParamsExample: string = 'Params'
    public i18nDescription: string = 'Description'
    public providesPreview: boolean = false

    private context: SlashCommandContext
    private sender: IUser
    private me: IUser
    private contextRoom: IRoom
    private read: IRead
    private modify: IModify

    constructor(private readonly app: App) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        this.context = context
        this.sender = context.getSender()
        this.me = (await read.getUserReader().getAppUser()) as IUser
        this.contextRoom = context.getRoom()
        this.read = read
        this.modify = modify

        const [command, subcommand]: Array<string> = context.getArguments()

        switch (command) {
            case 'help':
                this.processHelpCommand()
            case 'notification':
                this.processNotificationCommand(subcommand)
                break
            case 'join':
            case '':
                this.processJoinCommand()
                break
            default: // do something
        }
    }

    private async processHelpCommand() {
        await sendToDirectMessage({
            modify: this.modify,
            read: this.read,
            user: this.sender,
            message: {text: 'help'}
        })
    }

    private async processNotificationCommand(subcommand: string) {
        switch (subcommand) {
            case 'start':
                await this.startRecurringNotificationjob()
            case 'stop':
                await this.modify.getScheduler().cancelJob(RecurringNotificationJobs.WEEKLY)
                return
            default: // do something
        }
    }

    private async processJoinCommand() {
        const roomUrl = await getWeeklyData(this.app.getLogger(), this.read)
        if (roomUrl === undefined) {
            return await this.notifySender({
                // tslint:disable-next-line: quotemark
                text: "room url couldn't be generated, please contact your admin"
            })
        }

        // this won't be like this in the future
        // ideally speaking ^
        const b = this.modify.getCreator().getBlockBuilder()
        b.addSectionBlock({
            text: {
                type: TextObjectType.PLAINTEXT,
                text: 'Join the weekly meeting by clicking the "Join" button below'
            }
        })
        b.addActionsBlock({
            elements: [
                b.newButtonElement({
                    text: {
                        type: TextObjectType.PLAINTEXT,
                        text: 'Join'
                    },
                    url: roomUrl
                })
            ]
        })

        await this.notifySender({blocks: b.getBlocks()})
    }

    private async startRecurringNotificationjob(): Promise<void> {
        const l = this.app.getLogger()
        const bbbRoomUrl = await getWeeklyData(l, this.read)
        if (bbbRoomUrl === undefined) {
            return
        }
        const cronExpr = await getCronExpression(l, this.read)
        if (cronExpr === undefined) {
            return
        }
        const notificationRooms = await getNotificationRooms(l, this.read)
        await this.modify.getScheduler().scheduleRecurring({
            id: RecurringNotificationJobs.WEEKLY,
            interval: cronExpr as string,
            skipImmediate: true,
            data: {modify: this.modify, read: this.read, bbbRoomUrl, notificationRooms}
        })
    }

    private async notifySender(message: Omit<IMessage, 'sender' | 'room'>): Promise<void> {
        await notifyUser({
            modify: this.modify,
            read: this.read,
            user: this.sender,
            room: this.contextRoom,
            message
        })
    }
}
