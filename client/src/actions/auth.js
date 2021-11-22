import { FETCH_ALL, UPDATE, CREATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        //Sign in the user
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //Sign up the user
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}