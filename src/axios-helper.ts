import { AxiosError } from "axios";
import { logger } from "./logger";

/**
 * Helper function that logs and re-throws depending on what axios error occurs.
 * @param error An AxiosError object.
 */
export const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
        // Server responded with status code not in 2xx range
        logger.error(error.response);
        throw new Error(JSON.stringify(error.response));
    } else if (error.request) {
        // Request made, no response received
        logger.error(error.request);
        throw new Error(JSON.stringify(error.request));
    }
    // All other errors
    logger.error(error.message);
    throw new Error(error.message);
};
