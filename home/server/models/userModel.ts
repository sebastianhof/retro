export enum UserRole {
    ADMIN = 0,
    USER = 1
}

export interface UserModel {
    username: string,
    password?: string,
    role?: UserRole
    firstname?: string,
    lastname?: string,
    email?: string,
}