import mongoose, { Connection } from 'mongoose';
/**
 * Contains the Db class. Contains all methods related
 * to interacting with the database on MongoDB Atlas.
 */

export class Db {

    /**
     * States of MongoDB's connection status to the DB.
     */
    static readonly states = [
        "connecting",
        "connected",
        "disconnecting",
        "disconnected"
    ]

    /**
     * Connects to database instance on MongoDB Atlas.
     */
    public async connect() {
        for (const state of Db.states) {
            mongoose.connection.on(state, () => {
                console.log(`MongoDB: ${state}.`);
            });
        }
        try {
            if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
                const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
                    autoIndex: true,
                    serverSelectionTimeoutMS: 5000,
                });
                this._connection = dbConnection.connection;
            }
        } catch (error) {
            console.log(`Error connecting to DB: ${error}`);
        }
    }

    public get connector(): Connection {
        return this._connection;
    }

    /**
     * Property of type Connection. Contains the state of the
     * MongoDB connection.
     */
    private _connection: Connection;
}