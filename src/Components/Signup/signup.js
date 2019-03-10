import React from 'react';

import './signup.css';


export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SignupFields: {
                name: "",
                userName: "",
                email: "",
                password: "",
                about: ""
            }
        };
    }
    changeHandler(fieldName, event) {
        let newSignupFields = { ...this.state.SignupFields };
        newSignupFields[fieldName] = event.target.value;
        this.setState({ SignupFields: newSignupFields });
    }
    render() {
        return (
            <div className="signup-content">
                <div className="modal-login modal-sign-up">
                    <div className="modal-content sign-up">
                        <h3>Sign Up</h3>
                        <form action="" onSubmit={this.onSubmit.bind(this)}>
                            <input type="text" placeholder="Name" name="name" value={this.state.SignupFields.name} onChange={this.changeHandler.bind(this, 'name')} ref="name" required />
                            <input type="text" placeholder="User Name" name="userName" value={this.state.SignupFields.userName} onChange={this.changeHandler.bind(this, 'userName')} ref="userName" required />
                            <input type="email" placeholder="Email" name="email" value={this.state.SignupFields.email} onChange={this.changeHandler.bind(this, 'email')} ref="email" required />
                            <input type="password" placeholder="Password" name="password" value={this.state.SignupFields.password} onChange={this.changeHandler.bind(this, 'password')} ref="password" required />
                            <input type="text" placeholder="About You" name="about" value={this.state.SignupFields.about} onChange={this.changeHandler.bind(this, 'about')} ref="about" />
                            <div className="signup-btn">
                                <button>Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    onSubmit(e) {
        e.preventDefault();
        // store.dispatch({type : "CREATE_USER", payload : this.state.SignupFields});
        this.refs.name.value = "";
        this.refs.userName.value = "";
        this.refs.email.value = "";
        this.refs.password.value = "";
        this.refs.about.value = "";
        this.props.history.push('/login')
    }
}