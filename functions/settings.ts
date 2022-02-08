import {ILogger, IRead} from '@rocket.chat/apps-engine/definition/accessors'
import {IRoom} from '@rocket.chat/apps-engine/definition/rooms'
import {GeneralSettings} from '../settings/General'
import {WeeklySettings} from '../settings/Weekly'

const getWeeklyData = async (logger: ILogger, read: IRead): Promise<string | undefined> => {
    const s = read.getEnvironmentReader().getSettings()
    const bbbServer = await s.getValueById(GeneralSettings.bbbServer.id)
    if (
        bbbServer?.replace(/\s/g, '').length === 0 ||
        /^https?:\/\//.exec(bbbServer as string) === null
    ) {
        logger.debug(`"${bbbServer}" is not a valid server url`)
        return
    }

    const roomId = await s.getValueById(WeeklySettings.roomId.id)
    if (roomId?.replace(/\s/g, '').length === 0) {
        logger.debug(`no roomId found in settings`)
        return
    }

    const roomUrl = `${bbbServer.replace(/\/$/, '')}/b/${roomId}`

    return roomUrl
}

const getNotificationRooms = async (
    logger: ILogger,
    read: IRead
): Promise<Array<IRoom> | undefined> => {
    // handle novalue
    const notificationRooms: string = await read
        .getEnvironmentReader()
        .getSettings()
        .getValueById(WeeklySettings.notificationRooms.id)

    if (/^\s*$/.exec(notificationRooms) !== null) {
        logger.debug(`no notification room setting found`)
        return
    }

    logger.debug(`WeeklySettings.notificationRooms: ${notificationRooms}`)

    const toiroom = async (name: string): Promise<IRoom | undefined> => {
        const room = await read.getRoomReader().getByName(name)
        if (room === undefined) {
            logger.debug(`room #${name} doesn't exist`)
        }
        return room
    }

    const rooms = await Promise.all(notificationRooms.split(',').map(toiroom).filter(Boolean))

    logger.debug(`valid rooms: ${rooms.forEach(room => room?.displayName || room?.slugifiedName)}`)

    return rooms as Array<IRoom>
}

async function getCronExpression(logger: ILogger, read: IRead): Promise<string | undefined> {
    const s = read.getEnvironmentReader().getSettings()

    const day: string = await s.getValueById(WeeklySettings.dayOfWeek.id)
    if (/^\s*$/.exec(day) !== null) {
        logger.debug(`invalid dayofweek setting detected: "${day}"`)
        return
    }

    const timeString: string = await s.getValueById(WeeklySettings.time.id)
    if (/^\d{2}:\d{2}\s+P|AM\s*$/.exec(timeString) === null) {
        logger.debug(`invalid time string detected: "${timeString}"`)
        return
    }

    // tslint:disable-next-line: prefer-const
    let [hours, minutes, period]: Array<number | string> = timeString.split(/:| +/)
    if (
        Number.isNaN((hours = parseInt(hours as string, 10))) ||
        Number.isNaN((minutes = parseInt(minutes as string, 10)))
    ) {
        return undefined
    }
    if (period !== undefined && period.toLowerCase() === 'pm') {
        if (hours > 12) {
            return undefined
        }
        hours = (hours + 12) % 24
    }

    const dayOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ].indexOf(day)

    return `${minutes} ${hours} * * ${dayOfWeek}`
}

export {getWeeklyData, getNotificationRooms, getCronExpression}
