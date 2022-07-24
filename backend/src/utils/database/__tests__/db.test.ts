import { Db } from '../../database/db';
import { IUser } from '../../../models/db/user/user';
import { faker } from '@faker-js/faker';
import config from 'config';
import User from '../../../rmembr/user/user';
import { IDeleteUserResponse, ILoginResponse } from '../../../models/response/response_models';

/**
 * Tests checking the database connection.
 */

describe("Test DB", () => {
    jest.setTimeout(100000);
    let testDb: Db;
    beforeAll(async () => {
        testDb = new Db();
        await testDb.connect(config.get('database'));
    });
    afterAll(async () => {
        await testDb.connector.close();
    });
    test("Test connection", async () => {
        const mockUser: IUser = {
            email: faker.internet.email(),
            name: faker.name.findName(),
            password: faker.internet.password(),
        }
        /** Test connection by creating new user. */
        const testUser: User = new User(mockUser);
        const create: ILoginResponse = await testUser.createUser();
        expect(typeof create.token).toBe("string");
        /** Check if user exists in DB. */
        const getUser: User = await User.getUser(mockUser.email);
        expect(getUser.email).toBe(mockUser.email.toLowerCase());
        /** Clear user from the DB. */
        const deleted: IDeleteUserResponse = await User.delete(getUser);
        expect(typeof deleted.user).toBe("string");
        expect(typeof deleted.courseGroup).toBe("string");
    });
});