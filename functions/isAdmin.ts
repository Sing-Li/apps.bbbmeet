import {IUser} from '@rocket.chat/apps-engine/definition/users'

export function isAdmin(user: IUser): boolean {
    return user.roles.includes('admin')
}
