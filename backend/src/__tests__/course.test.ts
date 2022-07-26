import App from "../app";
import TestUtils from "./utils/utils";
import supertest from "supertest";
import { IUser } from "../models/db/user/user";
import { ICourse } from "../models/db/planner_models/course";
import { faker } from "@faker-js/faker";
import User from "../rmembr/user/user";

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

    it("User adds a course to their course group", async () => {
        const course = {
            name: faker.lorem.word(),
        }
        await supertestApp.
            post("/planner/courses").
            auth(userSetupBundle.token, { type: 'bearer' }).
            send(course).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect(async (res: any) => {
                const payload: { course: ICourse } = res.body.payload;
                expect(payload).toBeDefined();
                expect(payload.course).toBeDefined();
                expect(payload.course.name).toBeDefined();
                expect(payload.course.name).toEqual(course.name);
                expect(payload.course._courseGroupId).toEqual(
                    (await User.getUser(userSetupBundle.user.email)).courseGroupId
                );
            });
    });

    afterAll(async () => {
        await TestUtils.destroyUser(app, userSetupBundle.user, userSetupBundle.token);
        await app.db.connector.close();
    });
});