import { IUser } from "../models/db/user/user";
import { faker } from '@faker-js/faker';
import { Auth } from "../rmembr/auth/auth_engine";
import App from "../app";
import supertest from "supertest";

let supertestApp: any;
let serverInstance: App = new App();


describe("Create users", () => {
    
    beforeAll(async () => {
        await serverInstance.initialize();
        supertestApp = supertest(serverInstance.server);
        jest.setTimeout(100000);
    }, 100000);

    const modelUser: IUser = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password()
    }

    it("Should create a new user successfully", async () => {
        await supertestApp.
            post("/auth/create-user/").
            send(modelUser).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                const token = res.body.payload.token;
                expect(token).toBeDefined();
                expect(Auth.verifyToken(token).email).toEqual(modelUser.email);
            });
    }, 100000);
    
    afterAll(async () => {
        await serverInstance.db.connector.close();
    }, 100000);
});