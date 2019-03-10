import React from 'react';
import logo from '../../images/logo.svg';
import user from '../../images/user-icon.png';
import reduxIcon from '../../images/redux-title.png';
// import { store } from '../../store';
import { connect } from 'react-redux';
import './dashboard.css';


function mapStateToProps(store) {
    return {
        loginUserFromStore: store.loginUser,
        bookedHuts: JSON.parse(localStorage.getItem('bookedHut'))
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchLogOutUser: (loginDetails) => {
            dispatch({ type: "LOGOUT_USER" })
        }
    }
}



class Dashboard extends React.Component {
    render() {
        if (this.props.loginUserFromStore.length - 1) {
            alert("You need to login first");
            this.props.history.push('/login');
            return '';
        }
        return (
            <div>
                <dashboard-header>
                    <div>
                        <ul className="user-dashboard">
                            <li>
                                <a href="https://reactjs.org/" target="_blank" rel='noopener noreferrer'>
                                    <img className="app-logo" src={logo} alt="" />
                                </a>
                                <a href="https://redux.js.org/" target="_blank" rel='noopener noreferrer'>
                                    <img className="app-logo" src={reduxIcon} alt="" />
                                </a>

                                <div className="app-name">React-Redux App</div>
                                <img className="user-icon" src={user} alt="" />
                                <button onClick={this.clickHandler.bind(this)}> Logout </button>
                            </li>
                        </ul>
                    </div>
                </dashboard-header>
                <div className="dashboard-content">
                    <div>
                        <p className="">welcome <b>{this.props.loginUserFromStore[0].userName}</b>, this is your dashboard. </p>
                    </div>
                    <div>
                        {this.props.bookedHuts ?
                            <div className="show-booked-huts">
                                <h2>Your Bookings</h2>
                                <img src={'../../images/' + this.props.bookedHuts.thumbnailURI} alt="" />
                                <h4>Hut Name : {this.props.bookedHuts.name}</h4>
                                <button onClick={this.checkDetails.bind(this)} className="check-details">Check Details</button>
                                <button className="check-details" onClick={this.cancelBooking.bind(this)}>Cancel Booking</button>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    clickHandler(e) {
        e.preventDefault();
        this.props.dispatchLogOutUser(this.props.loginUserFromStore);
        this.props.history.push('/');
    }
    checkDetails(id) {
        id = this.props.bookedHuts.id;
        this.props.history.push('/hutDetails/' + id);
    }
    cancelBooking() {
        alert(
            "Your cancellation for " + this.props.bookedHuts.name + " at " + this.props.bookedHuts.location
            + " is confirmed. \n You should have another look on our 'Registered Huts'.");
        localStorage.removeItem('bookedHut');
        this.props.history.push('/huts');
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)