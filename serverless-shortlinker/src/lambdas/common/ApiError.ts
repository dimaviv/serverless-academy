export default class ApiError extends Error {
    status: number;
    errors?: any[];

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static badRequest(message: string, errors: any[] = []): ApiError {
        return new ApiError(400, message, errors);
    }

    static unauthorized(message: string): ApiError {
        return new ApiError(403, message);
    }

    static notFound(message: string): ApiError {
        return new ApiError(404, message);
    }

    static internal(message: string): ApiError {
        return new ApiError(500, message);
    }

}
