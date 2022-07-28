import App from "../app";
import TestUtils from "./utils/utils";
import supertest from "supertest";
import { IUser } from "../models/db/user/user";
import { ICourse } from "../models/db/planner_models/course";
import { faker } from "@faker-js/faker";
import { ICreateSectionResponse } from "../models/response/response_models";
import { ISection } from "../models/db/planner_models/sections";
import SubsectionGroup from "../rmembr/planner/subsection/subsection_group";

let supertestApp: any;
let app: App;
let userSetupBundle: { token: string, user: IUser };

describe("Section Test", () => {

    let createdCourse: ICourse;
    let createdSection: ISection;

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

    it("User adds a section to their course", async () => {
        const newSection = {
            name: faker.lorem.word(),
        }
        await supertestApp.
            post(`/planner/courses/${createdCourse._id}/sections`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            send(newSection).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect(async (res: any) => {
                const payload: ICreateSectionResponse = res.body.payload;
                createdSection = payload.section;
                expect(payload).toBeDefined();
                expect(payload.section).toBeDefined();
                expect(payload.subsections).toBeDefined();
                expect(payload.section.name).toBeDefined();
                expect(payload.section.name).toEqual(newSection.name);
                expect(payload.section._courseId).toEqual(createdCourse._id);
                expect(payload.subsections.subsections.length).toEqual(0);
            });
    });

    it("User retrieves a section from their course", async () => {
        await supertestApp.
            get(`/planner/courses/${createdCourse._id}/sections/${createdSection._id}`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                const payload = res.body.payload;
                expect(payload).toBeDefined();
                expect(payload.section).toBeDefined();
                expect(payload.subsections).toBeDefined();
                expect(payload.section.name).toBeDefined();
                expect(payload.section.name).toEqual(createdSection.name);
                expect(payload.section._courseId).toEqual(createdCourse._id);
                expect(payload.section._id).toEqual(createdSection._id);
                expect(payload.subsections.subsections.length).toEqual(0);
            });
    });

    it("User updates a section from their course", async () => {
        const newSection: ISection = {
            name: faker.lorem.word(),
            _id: createdSection._id,
            _courseId: createdCourse._id,
            subsectionGroupId: createdSection.subsectionGroupId,
        }
        await supertestApp.
            patch(`/planner/courses/${createdCourse._id}/sections/${createdSection._id}`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            send({ section: newSection }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect(async (res: any) => {
                const payload = res.body.payload;
                expect(payload).toBeDefined();
                expect(payload._id).toBeDefined();
                expect(payload._id).toEqual(createdSection._id);
                expect(payload._courseId).toEqual(createdCourse._id);
                expect(payload.name).toBeDefined();
                expect(payload.name).toEqual(newSection.name);
            });
    });

    it("User Deletes a section from their course", async () => {
        await supertestApp.
            delete(`/planner/courses/${createdCourse._id}/sections/${createdSection._id}`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect(async (res: any) => {
                const payload = res.body.payload;
                expect(payload).toBeDefined();
                expect(payload.sections).toBeDefined();
                expect(payload.sections.length).toEqual(0);
            });
    });

    it("User tries to add an invalid section. (bad request)", async () => {
        await supertestApp.
            post(`/planner/courses/${createdCourse._id}/sections`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            send({}).
            expect(400).
            expect("Content-Type", /application\/json/);
    });

    it.todo("User tries to retrieve a section that does not exist. (not found)");

    it.todo("User tries to update a section that does not exist. (not found)");

    afterAll(async () => {
        await TestUtils.destroyUser(app, userSetupBundle.user, userSetupBundle.token);
        await SubsectionGroup.destroy(createdSection.subsectionGroupId);
        await app.db.connector.close();
    });
});