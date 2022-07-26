import App from "../app";
import TestUtils from "./utils/utils";
import supertest from "supertest";
import { IUser } from "../models/db/user/user";

let supertestApp: any;
let app: App;
let userSetupBundle: { token: string, user: IUser };

describe("Course group tests", () => {

    beforeAll(async () => {
        app = await TestUtils.setupServer();
        supertestApp = supertest(app.server);
        userSetupBundle = await TestUtils.setupUser(app);
        jest.setTimeout(100000);
    });

    it("Check if the user has the correct course group", async () => {
        await supertestApp.
            get("/planner/courses").
            auth(userSetupBundle.token, { type: 'bearer' }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                const payload = res.body.payload;
                expect(payload).toBeDefined();
                expect(payload.name).toBeDefined();
                expect(payload.name).toEqual(`${userSetupBundle.user.name}'s Courses`);
                expect(payload.courses).toBeDefined();
                expect(payload.courses.length).toEqual(0);
            });
    });

    afterAll(async () => {
        await app.db.connector.close();
    }, 10000);
})

