import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {Provider} from 'react-redux';
// import reducer from './store';
import registerServiceWorker from './registerServiceWorker';
// import {createStore,applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import Chart from './Components/Chartjs/chart'



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
// let store = createStore(reducer,applyMiddleware(looger,thunk));

ReactDOM.render(
    
        <Chart />
   
    , document.getElementById('root')
);
registerServiceWorker();
