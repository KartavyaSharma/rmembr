/** 
 * Contains all server models other than the ones defined
 * in the model subdir.
 */

export interface ErrorModel {
    /**
     * Unique error code which identifies the error.
     */
    code: string;

    /**
     * Status code of the error (by convention).
     */
    status: number;

    /**
     * Any additional data about the error. A helpful
     * string describing the error.
     */
    meta?: string;
}