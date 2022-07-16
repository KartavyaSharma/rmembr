import { Db } from '../../../utils/database/db';
import config from 'config';
import { tests } from '../../testing/user_dataset/dataset';
import { User } from '../../user/user';
import { 
    IDeleteUserResponse, 
    ILoginResponse, 
    ICourseGroupResponse 
} from '../../../models/response/response_models';

/**
 * Tests checking the database connection.
 */

describe("Test authentication", () => {
    jest.setTimeout(100000);
    let testDb: Db;
    beforeAll(async () => {
        testDb = new Db();
        await testDb.connect(config.get('database'));
    });
    afterAll(async () => {
        await testDb.connector.close();
    });
    test("POST /create-user", async () => {
        const testUser: User = new User(tests.create[0]);
        const create: ILoginResponse = await testUser.createUser();
        const getUser: User = await User.getUser(tests.create[0].email);
        const courseGroup: ICourseGroupResponse = await getUser.createNewCourseGroup();
        const deleted: IDeleteUserResponse = await User.delete(getUser);
        expect(typeof create.token).toBe("string");
        expect(getUser.email).toBe(tests.create[0].email);
        expect(typeof deleted.user).toBe("string");
        expect(typeof deleted.courseGroup).toBe("string");
    });
});