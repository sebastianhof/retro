export enum UserRole {
    ADMIN = 0,
    USER = 1
}

export interface UserModel {
    _id?: string,
    username: string, // unique
    password?: string,
    role?: UserRole
    firstname?: string,
    lastname?: string,
    email?: string,
}