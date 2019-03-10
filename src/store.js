// import {createStore,applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'
// import * as show from './action';

// let initialState = {
//     allUsers: localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')) : [],
//     loginUser: localStorage.getItem('loginUser') ? JSON.parse(localStorage.getItem('loginUser')) : [],
//     // huts: localStorage.getItem('registeredHuts') ? JSON.parse(localStorage.getItem('registeredHuts')) : [],
//     hutsArr : [
//         // {id:1, name:'Hut 1', price:'25000 Rs', details:'Lorem ipsum dolar sit', location:'Turtle Beach Karachi', thumbnailURI:'thumb1.jpg'},
//         // {id:2, name:'Hut 2', price:'15000 Rs', details:'Lorem ipsum dolar sit', location:'HawksBay Karachi', thumbnailURI:'thumb2.jpg'},
//         // {id:3, name:'Hut 3', price:'20000 Rs', details:'Lorem ipsum dolar sit', location:'Sandspit Karachi', thumbnailURI:'thumbs3.jpg'},
//         // {id:4, name:'Hut 4', price:'12000 Rs', details:'Lorem ipsum dolar sit', location:'HawksBay Karachi', thumbnailURI:'thumb4.jpg'},
       
//     ]
// }

// function reducer(state = initialState, action) {

//     let newState = { ...state };
//     switch (action.type) {
//         case "CREATE_USER":
//             newState.allUsers = [].concat(state.allUsers);
//             newState.allUsers.push(action.payload);
//             localStorage.setItem('allUsers', JSON.stringify(newState.allUsers));
//             if(newState.allUsers.length){
//                 alert("You are successfully enroll to the app. \n Now login to continue.")
//             }
//             break;
//         case "LOGIN_USER":
//             let validEmail = false;
//             let validUserPassword = false;
//             console.log("Inside LOGIN_USER");
//             console.log("action => ", action.payload);
//             if (newState.allUsers) {
//                 for (let i = 0; i < newState.allUsers.length; i++) {
//                     if (newState.allUsers[i].email === action.payload.email){
//                         validEmail = true;
//                         if(newState.allUsers[i].password === action.payload.password){
//                             validUserPassword = true;
//                             newState.loginUser = [].concat(state.loginUser);
//                             newState.loginUser.push(action.payload);
//                             //alert(`Dear ${newState.allUsers[i].name} you are successfully logged in`);
//                             localStorage.setItem('loginUser', JSON.stringify(newState.loginUser));
//                             // window.location.href = "/dashboard"
//                         }
//                         break;
//                     }
//                 }
//                 if( !validEmail ){
//                     alert("invalid user email address")
//                 }
//                 else if(!validUserPassword){
//                     alert("inavalid password")
//                 }
//             }
//             break;
//         case "LOGOUT_USER":
//             // localStorage.removeItem('loginUser');
//             newState.loginUser = [];
//             localStorage.setItem('loginUser',[]);
//             // localStorage.removeItem('bookedHut');
//             break;

//         case show.SHOW_HUTS:
//         console.log("data",action.payload)
            

//             newState.hutsArr = action.payload.results
           
//             // newState.hutsArr.push(action.payload);
//             // localStorage.setItem('registeredHuts', JSON.stringify(newState.hutsArr));
//             break;
//         case "SHOW_HUT_DETAILS":
//             newState.hutsArr = [].concat(state.hutsArr)
//             newState.hutsArr.push(action.payload);
//             break;
            
//     }

    

//     return newState;
// }



// const looger=store=>{
//     return next=>{
//         return action=>{
//             console.log('[MiddleWare]Dispatched ',action);
//             const result=next(action);
//             console.log('[middleware] next state',store.getState());
//             return result

//         }
//     }
// }

// export let store = createStore(reducer,applyMiddleware(looger,thunk));
import * as actionTypes from './action';
import { updateObject } from './utilities';//receiving updateObject from shared/utiltiy file
//initial state 
const initialState = {
    token: null,//no token
    userId: null,//no userid
    error: null,//no error
    loading: false,//no loading
    authRedirectPath: '/'
};
//auth start function that returns update object function
const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};
//authsuccess function receives state and action ,return update object function 
const authSuccess = (state, action) => {
    console.log("action",action.idToken)
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     } );
};
//authfail function that also return update object function 
const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};
//authlogout function that also returns updateObject function
const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};
//setAuthRedirectoath function that also returns updateObject function
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}
//this is main reducer that alls all the functions
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};
export default reducer;