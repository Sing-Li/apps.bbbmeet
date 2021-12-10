import {
  IAppAccessors,
  ILogger
} from '@rocket.chat/apps-engine/definition/accessors'
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata'
import { App } from '@rocket.chat/apps-engine/definition/App'

export default class BigBlueButton extends App {
  constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
    super(info, logger, accessors)
  }
}
