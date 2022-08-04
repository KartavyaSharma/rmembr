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

describe("Subsection Test", () => {

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

    it.todo("User's course should have an emply list of sections");

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
                createdSubsection = payload;
                expect(payload).toBeDefined();
                expect(payload.name).toBeDefined();
                expect(payload.name).toEqual(newSubsection.name);
                expect(payload._sectionId).toEqual(createdSection._id);
            });
    });

    it.todo("Size of subsections in subsection group should be 1");

    it.todo("Retrieve subsection just created");

    it.todo("Checking for all subsection properties from created subsection.");

    it.todo("Check off subsection with done status.");

    it.todo("Complete first second and third revision.");

    it.todo("Check color for DONE subsection");

    it.todo("Delete subsection");

    it.todo("Update subsection with new name");

    it.todo("Retrieve subsection with new name");

    it.todo("Retrieve invalid subsection");

    it.todo("Retrieve subsection with invalid section id");

    it.todo("Delete invalid subsection");

    it.todo("Update invalid subsection");

    afterAll(async () => {
        await TestUtils.destroyUser(app, userSetupBundle.user, userSetupBundle.token);
        await SubsectionGroup.destroy(createdSection.subsectionGroupId);
        await app.db.connector.close();
    });
});