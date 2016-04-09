export interface UserModel {
    id: string,
    role?: UserRole
    firstname?: string,
    lastname?: string,
    email?: string,
}

export interface UserPasswordModel {
    userId: string,
    password: string
}

export enum UserRole {
    ADMIN = 0,
    USER = 1
}

