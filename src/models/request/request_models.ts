/**
 * Interface models for incoming requests across all routes
 * on the rmembr server.
 * 
 * Data based on these models will be returned from the
 * corresponding functions from inside ../rmembr directory.
 */

export interface IAuthRequest {
    email: string;
    name: string;
    password: string;
}