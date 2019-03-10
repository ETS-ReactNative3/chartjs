import { Bar, Line, Pie } from 'react-chartjs-2'


import React, { Component } from 'react';








class Chartjs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['karachi', 'lahore', 'islamabad'],
                datasets: [
                    {
                        label: 'population',
                        data: [
                            61759,
                            78909,
                            56789
                        ],
                        backgroundColor: [
                            'rgba(255,99,132,0.6)'
                        ]
                    }
                ]
            }
        }
    }

    render() {

        return (
            <div>
                <Bar
                    data={this.state.chartData}

                    options={{
                       title:{
                           display:true,
                           text:"largest cities of pakistan"
                       },
                       legend:{
                           display:true,
                           position:'right'

                       },
                       maintainAspectRatio: false
                    }}
                />
                <Pie
                data={this.state.chartData}

                options={{
                   title:{
                       display:true,
                       text:"largest cities of pakistan"
                   },
                   legend:{
                       display:true,
                       position:'right'

                   },
                   maintainAspectRatio: false
                }}
                
                />

            </div>
        )
    }


}
export default Chartjs;
