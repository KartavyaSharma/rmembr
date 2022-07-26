import { IUser } from "../models/db/user/user";
import { faker } from '@faker-js/faker';
import { Auth } from "../rmembr/auth/auth_engine";
import { UserModel } from "../models/db/user/user";
import App from "../app";
import supertest from "supertest";

let supertestApp: any;
let serverInstance: App = new App();


describe("User tests", () => {

    let accessToken: string;
    
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

    it("Create a new user successfully", async () => {
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

    it("Login with a valid user", async() => {
        const validUser: IUser = {
            email: modelUser.email,
            password: modelUser.password
        }
        await supertestApp.
            get("/auth/login/").
            send(validUser).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                const token = res.body.payload.token;
                expect(token).toBeDefined();
                expect(Auth.verifyToken(token).email).toEqual(modelUser.email.toLowerCase());
                accessToken = token;
            });
    });

    it("Login with an invalid user", async () => {
        const invalidUser: IUser = {
            email: modelUser.email,
            password: "invalid password"
        }
        await supertestApp.
            get("/auth/login/").
            send(invalidUser).
            expect(401).
            expect("Content-Type", /application\/json/);
    });

    it("Check if user have valid course group", async () => {
        const user: IUser = await UserModel.findOne({ email: modelUser.email });
        expect(user.courseGroupId).toBeDefined();
    });

    it("Try creating a new user with the same email", async () => {
        await supertestApp.
            post("/auth/create-user/").
            send(modelUser).
            expect(500).
            expect("Content-Type", /application\/json/);
    });

    it("Delete a user successfully", async () => {
        await supertestApp.
            delete("/planner/").
            auth(accessToken, { type: 'bearer' }).
            send(modelUser).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                const deleteString = res.body.payload.user;
                expect(deleteString).toBeDefined();
                expect(deleteString).toEqual(`User ${modelUser.name} deleted.`);
            });
    });
    
    afterAll(async () => {
        await serverInstance.db.connector.close();
    }, 100000);
});