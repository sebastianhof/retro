import {UserRole} from "../models/userModel";
export enum RetroError {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

export class RetroErrorMessage {

}

export class RetroLogger {

    public static error(err:Error) {
        console.log(err);
    }

}

export class RetroAuth {

    public static isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.send(401);
        }
    }

    public static isAdmin(req, res, next) {
        if (req.user && req.user.role == UserRole.ADMIN) {
            return next();
        } else {
            return res.send(401);
        }
    }

}