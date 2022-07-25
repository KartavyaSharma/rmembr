import User from "../rmembr/user/user";
import { IUser } from "../models/db/user/user";
import { faker } from '@faker-js/faker';
import { ILoginResponse } from "../models/response/response_models";
import { Auth } from "../rmembr/auth/auth_engine";

describe("Create users", () => {
    it("Should create a new user successfully", async () => {
        const mockUser: IUser = {
            email: faker.internet.email(),
            name: faker.name.findName(),
            password: faker.internet.password(),
        }
        const testUser = new User(mockUser);
        const testToken = Auth.generateToken(testUser);
        const spy = jest.spyOn(testUser, 'createUser')
            .mockResolvedValue(
                { token: testToken } as ILoginResponse
            );
        await testUser.createUser();
        let spyCreatedUser: string = spy.mock.results[0].value.token;
        console.log(spyCreatedUser);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spyCreatedUser).toEqual(testToken);
        spy.mockReset();
    });
});