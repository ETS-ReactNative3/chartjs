import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';


// export const SHOW_HUTS='SHOW_HUTS';

// export const initIngredients = () => {
//     return dispatch => {
//         axios.get( 'https://randomuser.me/api' )
//             .then( response => {
//                 console.log('response',response.data)
//                dispatch(showhut(response.data));
//             } )
//             .catch( error => {
//                 console.log('error',error)
//             } );
//     };
// };
// export const showhut=(hutsArr)=>{
//     return{
//         type:SHOW_HUTS,
//         payload:hutsArr
//     }
// }

//authentication start function
export const authStart = () => {
    return {
        type:AUTH_START//authentication start type from action types
    };
};
//authentication success function
export const authSuccess = (token, message) => {
    return {
        type: AUTH_SUCCESS,//authentication susccess type from action types
        idToken: token,//receiving token from  auth function
        userId: message //receiving userId from auth function
    };
};
//authentication Failed function
export const authFail = (error) => {
    return {
        type: AUTH_FAIL,////authentication fail type from action types
        error: error//received error from auth catch function
    };
};
//authentication logout function
export const logout = () => {
    localStorage.removeItem('token');//removing token from localhost of browser
    localStorage.removeItem('expirationDate');//removing expirationdate from local host browser
    localStorage.removeItem('userId');//removing user id from local host browser
    return {
        type: AUTH_LOGOUT//authentication logout type from action types
    };
};
//authentication time checkout function
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};
//authentication real function
export const auth = (email, password, isSignup) => {
    console.log("email",email);
    console.log("password",password)
    return dispatch => {
        dispatch(authStart());
        const authData = {
            
            email: email,
            password: password,
           
        };
        let url = 'http://localhost:2000/user/login';
        // if (!isSignup) {
        //     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
        // }
        axios.post(url, authData)
            .then(response => {
                console.log("response",response.data.token)
                // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);//setting token in local host
                // localStorage.setItem('expirationDate', expirationDate);//setting expiration date in localstorage
                localStorage.setItem('userId', response.data._id);//setting userID in localstorage
                dispatch(authSuccess(response.data.token, response.data.message));//dispatching auth success function with token and userid
                dispatch(checkAuthTimeout(response.data.expiresIn));//dispatching authchecktime function with expiration date
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));//sending error message to authfail function
            });
    };
};
//auth redirection function
export const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,//auth type from actionstypes
        path: path
    };
};
//auth check state function which check user is login or not
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');//receiving token from localstorage
        if (!token) {
            dispatch(logout());//if no token than dispatching logout function
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));//getting expiration date from localstorage
            if (expirationDate <= new Date()) {
                dispatch(logout());//if expiration date is less than equal to new date than logout 
            } else {
                const userId = localStorage.getItem('userId');//getting userid from localstorage
                dispatch(authSuccess(token, userId));//sending tokena amd userid to authsuccess function
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));//calculating expiration date
            }   
        }
    };
};

