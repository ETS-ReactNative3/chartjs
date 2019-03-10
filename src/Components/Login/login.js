import React from 'react';
import { connect } from 'react-redux';
import './login.css';
import * as actions from '../../auth';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../utilities';

const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        // error: state.auth.error,
        isAuthenticated: state.userId,
        // // buildingBurger: state.burgerBuilder.building,
        // authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginFields: {
                userName: "",
                email: "",
                password: ""
            },
            isSignup: true
        };
    }
    componentDidMount () {
        if ( !this.props.buildingBurger && this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
    }

    // inputChangedHandler = ( event, controlName ) => {
    //     const updatedControls = updateObject( this.state.controls, {
    //         [controlName]: updateObject( this.state.controls[controlName], {
    //             value: event.target.value,
    //             valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
    //             touched: true
    //         } )
    //     } );
    //     this.setState( { controls: updatedControls } );
    // }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.LoginFields.email, this.state.LoginFields.password, this.state.isSignup );
        this.refs.userName = "";
        this.refs.email = "";
        this.refs.password = "";
    }

    // switchAuthModeHandler = () => {
    //     this.setState( prevState => {
    //         return { isSignup: !prevState.isSignup };
    //     } );
    // }

    changeHandler(fieldName, event) {
        let newLoginFields = { ...this.state.LoginFields };
        newLoginFields[fieldName] = event.target.value;
        this.setState({ LoginFields: newLoginFields });
    }
    render() {
        // if( !this.props.allUsersFromStore.length ){
        //     alert("You Need To SignUp First.");
        //     this.props.history.push("/sign-up");
        // }
        if (this.props.isAuthenticated==="Auth successful") {
            this.props.history.push('/dashboard')
            return '';
        }
        return (
            <div className="content">
                <div className="modal-login">
                    <div className="modal-cont">
                        <h3>LOGIN</h3>
                        <form action="" onSubmit={this.submitHandler.bind(this)}>
                            <input type="text" placeholder="User name" name="userName" value={this.state.LoginFields.userName} onChange={this.changeHandler.bind(this, 'userName')} ref="username" required/>
                            <input type="email" placeholder="Email" name="email" value={this.state.LoginFields.email} onChange={this.changeHandler.bind(this, 'email')} ref="email" required />
                            <input type="password" placeholder="Password" name="password" value={this.state.LoginFields.password} onChange={this.changeHandler.bind(this, 'password')} ref="password" required />
                            <div className="login-btn">
                                <button>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    // onSubmit(e) {
    //     e.preventDefault();
    //     this.props.dispatchLoginDetails(this.state.LoginFields);
    //     this.refs.userName = "";
    //     this.refs.email = "";
    //     this.refs.password = "";
    // }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);