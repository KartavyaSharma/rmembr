import App from "../../app";
import { faker } from "@faker-js/faker";
import { IUser } from "../../models/db/user/user";
import supertest from "supertest";
import { Auth } from "../../rmembr/auth/auth_engine";
/**
 * Class containing helper function for tests.
 */
export default class TestUtils {

    /** 
     * Initializes the server with all the routes and 
     * the server instance. 
     * */
    public static async setupServer(): Promise<App> {
        const app: App = new App();
        await app.initialize();
        return app;
    }

    /**
     * Sets up the user for tests.
     * @param serverInstance current instance of the running server
     * @returns the token for the generated user and the user object itself.
     */
    public static async setupUser(serverInstance: App): Promise<{ token: string, user: IUser }> {
        const modelUser: IUser = {
            email: faker.internet.email(),
            name: faker.name.findName(),
            password: faker.internet.password()
        }
        const supertestApp = supertest(serverInstance.server);
        let resToken: string;
        await supertestApp.
            post("/auth/create-user/").
            send(modelUser).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                const token = res.body.payload.token;
                expect(token).toBeDefined();
                expect(Auth.verifyToken(token).email).toEqual(modelUser.email);
                resToken = token;
            });
        return { token: resToken, user: modelUser };
    }

    /**
     * Logs in the user and returns the token.
     * @param serverInstance current instance of the running server
     * @param user user credential required for logic process
     * @returns a token for the newly logged in user
     */
    public static async loginUser(serverInstance: App, user: IUser): Promise<{ token: string }> {
        const supertestApp = supertest(serverInstance.server);
        let resToken: string;
        await supertestApp.
            get("/auth/login/").
            send({
                email: user.email,
                password: user.password
            }).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                const token = res.body.payload.token;
                expect(token).toBeDefined();
                expect(Auth.verifyToken(token).email).toEqual(user.email.toLowerCase());
                resToken = token;
            });
        return { token: resToken };
    }

    /**
     * Destroys user from the server.
     * @param serverInstance current instance of the running server
     * @param user user credentials requried for identifying the user to be deleted
     * @param token token required for deleting the user
     * @returns a promise that resolves when the user is deleted
     */
    public static async destroyUser(serverInstance: App, user: IUser, token: string): Promise<void> {
        const supertestApp = supertest(serverInstance.server);
        await supertestApp.
            delete("/planner/").
            auth(token, { type: 'bearer' }).
            send(user).
            expect(200).
            expect("Content-Type", /application\/json/).
            expect((res: any) => {
                const deleteString = res.body.payload.user;
                expect(deleteString).toBeDefined();
                expect(deleteString).toEqual(`User ${user.name} deleted.`);
            });
    }

    public static async setupCourse(): Promise<void> {

    }

    public static async setupSection(): Promise<void> {

    }

    public static async setupSubsection(): Promise<void> {

    }
}