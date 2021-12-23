export function getCronExpression(
    dayOfWeek: string | number,
    timeString: string
): string | undefined {
    // tslint:disable-next-line: prefer-const
    let [hours, minutes, period]: Array<number | string> =
        timeString.split(/:| +/)
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
    if (typeof dayOfWeek === 'string') {
        dayOfWeek = [
            '_',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday'
        ].indexOf(dayOfWeek, 1)
    }
    return `${minutes} ${hours} * * ${dayOfWeek}`
}
