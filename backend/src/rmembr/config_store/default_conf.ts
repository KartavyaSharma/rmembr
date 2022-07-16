import { ISettings } from "../../models/db/user/settings";

export interface IDefaultConf {
    settings: ISettings;
}

export const defaultConf: IDefaultConf = {
    settings: {
        intervals: {
            number: [2, 7, 30]
        },
        warning: {
            daysTillDeadline: 2
        }
    }
}