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
let createdCourse: ICourse;

describe("Section Test", () => {

    beforeAll(async () => {
        app = await TestUtils.setupServer();
        supertestApp = supertest(app.server);
        userSetupBundle = await TestUtils.setupUser(app);
        createdCourse = await TestUtils.setupCourse(app, userSetupBundle);
    });

    it("User's course should have an emply list of sections", async () => {
        await supertestApp.
            get(`/planner/courses/${createdCourse._id}`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                const payload = res.body.payload;
                expect(payload).toBeDefined();
                expect(payload.sections).toBeDefined();
                expect(payload.sections.length).toEqual(0);
            });
    });

    afterAll(async () => {
        await TestUtils.destroyUser(app, userSetupBundle.user, userSetupBundle.token);
        await app.db.connector.close();
    });
});