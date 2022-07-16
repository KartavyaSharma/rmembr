import { ICreateUserRequest, ILoginRequest } from "../../../models/request/request_models";

export interface IUserDataset {
    create: ICreateUserRequest[];
    login: ILoginRequest[];
}

/** Dataset for User object. */
export const tests: IUserDataset = {
    create: [
        {
            name: "John Doe",
            email: "john@doe.com",
            password: "gobears"
        },
        {
            name: "",
            email: "",
            password: ""
        },
        {
            name: "John Doe",
            email: "johndoe",
            password: "gobears"
        }
    ],
    login: [
        {
            email: "john@doe.com",
            password: "gobears"
        },
        {
            email: "",
            password: ""
        },
        {
            email: "other@example.com",
            password: "somepass"
        }
    ]
}