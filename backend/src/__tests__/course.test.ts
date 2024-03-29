import App from "../app";
import TestUtils from "./utils/utils";
import supertest from "supertest";
import { ICourse } from "../models/db/planner_models/course";
import { faker } from "@faker-js/faker";
import User from "../rmembr/user/user";
import { IUserSetupBundle } from "../models/server_models";

let supertestApp: any;
let app: App;
let userSetupBundle: IUserSetupBundle;

describe("Course Test", () => {

    const newCourse = {
        name: faker.lorem.word(),
    }

    let createdCourse: ICourse;

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
        await supertestApp.
            post("/planner/courses").
            auth(userSetupBundle.token, { type: 'bearer' }).
            send({ payload: newCourse }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect(async (res: any) => {
                const payload: { course: ICourse } = res.body.payload;
                createdCourse = payload.course;
                expect(payload).toBeDefined();
                expect(payload.course).toBeDefined();
                expect(payload.course.name).toBeDefined();
                expect(payload.course.name).toEqual(newCourse.name);
                expect(payload.course._courseGroupId).toEqual(
                    (await User.getUser(userSetupBundle.user.email)).courseGroupId
                );
            });
    });

    it("User requests a course", async () => {
        await supertestApp.
            get(`/planner/courses/${createdCourse._id}`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect(async (res: any) => {
                const payload = res.body.payload;
                expect(payload).toBeDefined();
                expect(payload.name).toBeDefined();
                expect(payload.name).toEqual(createdCourse.name);
                expect(payload._courseGroupId).toEqual(
                    (await User.getUser(userSetupBundle.user.email)).courseGroupId
                );
                expect(payload._id).toEqual(createdCourse._id);
            });
    });

    it("User requrest an invalid course", async () => {
        await supertestApp.
            get("/planner/courses/12345").
            auth(userSetupBundle.token, { type: 'bearer' }).
            expect(404).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                console.log(res.body);
            })
    });

    it("User adds an invalid course to their course group", async () => {
        await supertestApp.
            post("/planner/courses").
            auth(userSetupBundle.token, { type: 'bearer' }).
            send({ payload: {} }).
            expect(400).
            expect("Content-Type", /application\/json/);
    });

    it("User updates a course name to something else", async () => {
        const updatedCourse: ICourse = {
            _id: createdCourse._id,
            _courseGroupId: createdCourse._courseGroupId,
            name: faker.lorem.words(),
            sections: createdCourse.sections
        }
        await supertestApp.
            patch(`/planner/courses/${createdCourse._id}`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            send({ payload: { course: updatedCourse } }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect(async (res: any) => {
                const payload = res.body.payload;
                expect(payload).toBeDefined();
                expect(payload._id).toBeDefined();
                expect(payload._courseGroupId).toBeDefined();
                expect(payload.sections).toBeDefined();
                expect(payload.name).toEqual(updatedCourse.name);
                expect(payload._id).toEqual(updatedCourse._id);
                expect(payload._courseGroupId).toEqual(updatedCourse._courseGroupId);
            });
    });

    it("User tires to update an invalid course", async () => {
        const invalidCourse: ICourse = {
            _id: "12345",
            _courseGroupId: "lakjsd;lkja",
            name: faker.lorem.words(),
            sections: [],
        }
        await supertestApp.
            patch("/planner/courses/12345").
            auth(userSetupBundle.token, { type: 'bearer' }).
            send({ payload: { course: invalidCourse } }).
            expect(404).
            expect("Content-Type", /application\/json/);
    });

    it("User tries to delete an invalid user", async () => {
        await supertestApp.
            delete("/planner/courses/12345").
            auth(userSetupBundle.token, { type: 'bearer' }).
            expect(404).
            expect("Content-Type", /application\/json/);
    });

    it("User deletes a course form their course group", async () => {
        await supertestApp.
            delete(`/planner/courses/${createdCourse._id}`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect(async (res: any) => {
                const payload = res.body.payload;
                expect(payload).toBeDefined();
                expect(payload.courses).toBeDefined();
                expect(payload.courses.length).toEqual(0);
            });
    });

    afterAll(async () => {
        await TestUtils.destroyUser(app, userSetupBundle.user, userSetupBundle.token);
        await app.db.connector.close();
    });
});