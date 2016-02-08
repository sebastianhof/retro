var uuid = require('uuid');

export enum RetroError {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

export class RetroErrorMessage {

}

export class RetroUUID {

    public static generateUUID(): string {
        return uuid.v4();
    }

}

export class RetroLogger {

    public static error(err:Error) {
        console.log(err);
    }

}

