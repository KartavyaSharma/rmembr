import App from "../app";
import TestUtils from "./utils/utils";
import supertest from "supertest";
import SubsectionGroup from "../rmembr/planner/subsection/subsection_group";
import { IUser } from "../models/db/user/user";
import { ICourse } from "../models/db/planner_models/course";
import { faker } from "@faker-js/faker";
import { ISection } from "../models/db/planner_models/sections";
import { ISubSection } from "../models/db/planner_models/subsections";

let supertestApp: any;
let app: App;
let userSetupBundle: { token: string, user: IUser };

describe("Section Test", () => {

    let createdCourse: ICourse;
    let createdSection: ISection;
    let createdSubsection: ISubSection;

    beforeAll(async () => {
        app = await TestUtils.setupServer();
        supertestApp = supertest(app.server);
        userSetupBundle = await TestUtils.setupUser(app);
        createdCourse = await TestUtils.setupCourse(app, userSetupBundle);
        createdSection = await TestUtils.setupSection(app, userSetupBundle, createdCourse._id);
    });

    it("User adds a subsection to their section", async () => {
        const newSubsection = {
            name: faker.lorem.word(),
        }
        await supertestApp.
            post(`/planner/courses/${createdCourse._id}/sections/${createdSection._id}/subsections`).
            auth(userSetupBundle.token, { type: 'bearer' }).
            send({ payload: newSubsection }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect(async (res: any) => {
                const payload: ISubSection = res.body.payload.subsection;
                console.log(payload);
                expect(payload).toBeDefined();
                expect(payload.name).toBeDefined();
                expect(payload.name).toEqual(newSubsection.name);
                expect(payload._sectionId).toEqual(createdSection._id);
            });
    });

    afterAll(async () => {
        await TestUtils.destroyUser(app, userSetupBundle.user, userSetupBundle.token);
        await SubsectionGroup.destroy(createdSection.subsectionGroupId);
        await app.db.connector.close();
    });
});