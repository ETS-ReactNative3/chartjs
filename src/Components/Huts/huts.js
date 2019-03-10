import React from 'react';
import { connect } from 'react-redux';
import './huts.css';
// import * as show from '../../action'
// function mapStateToProps(store) {
//     return {
//         hutsFromStore: store.hutsArr
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         dispatchHuts: () => {
//             dispatch(show.initIngredients ())
//         }
//     }
// }

class Huts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Huts: {
                registeredHuts: this.props.hutsFromStore
            }
        };
        // this.details = false;
        // console.log(this.details);
    }

    componentDidMount() {
        // this.props.dispatchHuts(this.state.HutsArray);
        // console.log('huts : ', this.state.Huts)
    }
    render() {
        return (
            <div className="huts-comp-cont">
                <h1>ALL REGISTERED HUTS</h1>
                <div className="huts">
                    {this.state.Huts.registeredHuts.map((obj, i) => {
                        if(obj){
                            return <div obj={obj} key={i} className="hut">
                                    {/* <img src={'/images/' + obj.thumbnailURI} className="hut-img" /> */}
                                    <p>
                                    <span className=""> {obj.name[0]} </span>
                                        <span className=""> {obj.gender} </span>
                                        <span className=""> {obj.email} </span>
                                        <span className=""> {obj.nat} </span>
                                        <span className=""> {obj.cell} </span>
                                        <span className=""> {obj.cell} </span>
                                        <span className=""> {obj.phone} </span>


                                        {/* <span><button className="details-btn" onClick={this.showDetails.bind(this, obj.id)}>Show Details</button></span> */}
                                    </p>
                                </div>;
                        }
                    })}
                </div>
            </div>
        );
    }

    showDetails(id) {
        console.log('id : ', id);
        this.props.history.push('/hutDetails/' + id);
    }
}
export default Huts;