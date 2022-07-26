import App from "../app";
import TestUtils from "./utils/utils";
import supertest from "supertest";
import { IUser } from "../models/db/user/user";

let supertestApp: any;
let app: App;
let userSetupBundle: { token: string, user: IUser };

describe("Course Test", () => {

    beforeAll(async () => {
        app = await TestUtils.setupServer();
        supertestApp = supertest(app.server);
        userSetupBundle = await TestUtils.setupUser(app);
    });

    it("User should have an empty course group, with no courses", async () => {
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
        await TestUtils.destroyUser(app, userSetupBundle.user, userSetupBundle.token);
        await app.db.connector.close();
    });
});