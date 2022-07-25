import { IUser } from "../models/db/user/user";
import { faker } from '@faker-js/faker';
import { ILoginResponse } from "../models/response/response_models";
import { Auth } from "../rmembr/auth/auth_engine";
import app from "../app";
import User from "../rmembr/user/user";
import supertest from "supertest";
import mongoose from "mongoose";

let supertestApp;

beforeAll(async () => {
    supertestApp = supertest(app);
})

describe("Create users", () => {
    it("Should return a 200 status code", async () => {

    });
    it("Should create a new user successfully", async () => {
        
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});