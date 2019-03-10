import React from 'react';
import './home.css'
import { BrowserRouter as Link } from 'react-router-dom';

export class Home extends React.Component {
    render() {
        return (
            <div className="home-comp">
                <h1>BEACH-HUT RESERVATION SYSTEM</h1>
                <div className='home-content'>
                    <h2>New to this app?</h2>
                    <h4>Register Yourself</h4>
                    <button className='btn'><Link to="/sign-up">Register</Link></button>
                </div>
                <div className='home-content'>
                    <h2>Already a member?</h2>
                    <h4>Login Now</h4>
                    <button className='btn'><Link to="/login">Login</Link></button>
                </div>
            </div>
        )
    }
}