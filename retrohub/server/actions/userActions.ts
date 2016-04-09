'use strict';
import {Store} from '../stores/store';
import {UserModel, UserPasswordModel} from '../models/userModel';

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export class UserActions {

    static addUser(user:UserModel) {

        Store.dispatch({
            type: ADD_USER,
            value: user
        });

    }

    static removeUser(userId:string) {

        Store.dispatch({
            type: REMOVE_USER,
            value: userId
        });

    }

    static updateUser(user:UserModel) {

        Store.dispatch({
            type: UPDATE_USER,
            value: user
        });

    }

    static updateUserPassword(userId:string, password:string) {
        let bcrypt = require('bcrypt-nodejs');

        let userPassword = <UserPasswordModel> {
            userId: userId,
            password: bcrypt.hashSync(password),
        };

        Store.dispatch({
            type: UPDATE_PASSWORD,
            value: userPassword
        })

    }

}