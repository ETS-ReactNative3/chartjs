import React from 'react';
import { connect } from 'react-redux';
import './hutDetails.css';

function mapStateToProps(store) {
    return {
        hutDetailsFromStore: store.hutsArr,
        loggedInUser: store.loginUser
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchHuts: (hutsArr) => {
            dispatch({ type: "SHOW_HUT_DETAILS", payload: hutsArr })
        }
    }
}

class HutDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Huts: {
                registeredHuts: this.props.hutDetailsFromStore
            },
        };
    }

    componentWillMount() {
        this.props.dispatchHuts(this.state.HutsArray);
        if(!this.props.loggedInUser.length){
            alert("Please Login First For Booking!")
        }
    }
    render() {
        if (this.props.hutDetailsFromStore) {
            console.log('this.props.hutDetailsFromStore ', this.props.hutDetailsFromStore)
        }
        return (
            <div className="selected-hut-comp-cont">
                <h1>DETAILS</h1>
                <div className="selected-hut">
                    {this.state.Huts.registeredHuts.map((obj, i) => {
                        if (obj) {
                            if (obj.id == this.props.match.params.id) {
                                return (
                                    <div className="detail-comp">
                                        <div obj={obj} key={i} className="selected-hut-body">
                                            <img src={'/images/' + obj.thumbnailURI} alt="" className="selected-hut-img" />
                                            {this.props.loggedInUser.length ? <button onClick={this.bookHut.bind(this)}>Book Now</button> : ''}

                                        </div>
                                        <div obj={obj} key={i} className="selected-hut-details-body">
                                            <h4 className="selected-hut-name font-color">Hut Name : </h4> <span className="font-color">{obj.name}</span>
                                            <br />
                                            <h4 className="selected-hut-details font-color">Details : </h4> <span className="font-color">{obj.details}</span>
                                            <br />
                                            <h4 className="selected-hut-details font-color">Location : </h4> <span className="font-color">{obj.location}</span>
                                            <br />
                                            <h4 className="selected-hut-details font-color">Price : </h4> <span className="font-color">{obj.price}</span>
                                        </div>
                                    </div>

                                );
                            }
                            else {
                                return false;
                            }
                        }
                    })}
                </div>
            </div>
        );
    }

    bookHut() {
        alert('Booked successfully!');
        this.state.Huts.registeredHuts.map((object, i) => {
            if (object) {
                if (object.id == this.props.match.params.id) {
                    return (
                        localStorage.setItem('bookedHut', JSON.stringify(object))
                    );
                }
            }
        });
        this.props.history.push('/dashboard');
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(HutDetails);