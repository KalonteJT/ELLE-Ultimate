import React, { Component } from 'react';
import Chart from '../components/Charts/Chart';
import PieChart from '../components/Charts/PieChart';
import LineChart from '../components/Charts/LineChart';
import { Button, Form, FormGroup, Input, Container, Label } from 'reactstrap';
import axios from 'axios';
import Template from './Template';

class Stats extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{},
      chartData2: {},
      csv : ''
    }
    
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.getChartData();
    this.getChartData2();
    //console.log(this.state.chartData);
  }

  getChartData(){
    // Ajax calls heres
    axios.get(this.props.serviceIP + '/stats', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    }).then(res => {
      const test = res.data;
      let labels = test.labels;
      let data = test.values;
      
    this.setState({
      chartData:{
        labels: res.data.labels,
        //labels: ['ELLE Mobile 2D', 'ELLE Mobile 3D', 'ELLE AR', 'ELLE VR', 'ELLE 2.0', 'Project ELLE'],
        datasets:[
          {
            label:'Progress',
            data : data,
            /*data:[
              9,
              5,
              6,
              2,
              3,
              5
            ],
            */
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
              ,
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });}).catch(function (error) {
      console.log(error);
      console.log(error.message);
    });
  }

//function ActionLink() {
  handleClick(e) {
    e.preventDefault();
    axios.get(this.props.serviceIP + '/exportgamelog', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    }).then(res => {
      console.log(res.data);
      this.setState({
      csv : res.data });
    }).catch(error =>{
          console.log(error);
          console.log(error.message);
          console.log(error.response.data);
          console.log(error.response.data.message);
        });
    
  }

  getChartData2(){
    // Ajax calls heres
    axios.get(this.props.serviceIP + '/progress', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    }).then(res => {
      const test = res.data;
      let labels = test.labels;
      let data = test.values;
      
    this.setState({
      chartData2:{
        labels: res.data.labels,
        //labels: ['ELLE Mobile 2D', 'ELLE Mobile 3D', 'ELLE AR', 'ELLE VR', 'ELLE 2.0', 'Project ELLE'],
        datasets:[
          {
            label:'Progress',
            data : data,
            /*data:[
              9,
              5,
              6,
              2,
              3,
              5
            ],
            */
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
              ,
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });}).catch(function (error) {
      console.log(error);
      console.log(error.message);
    });
  }

  render() {
    return (
    <Container>
      <div className="Stats">
      <Template/>
        <div className="Stats-header">
        <a href="/exportgamelog">
        Download Gamelogs CSV
        </a>
        </div>
        {Object.keys(this.state.chartData).length &&
        /*
            <Chart
              chartData={this.state.chartData}
              location="ELLE"
              legendPosition="bottom"
            />
*/
            <PieChart
              chartData={this.state.chartData}
              location="ELLE"
              legendPosition="bottom"
            />
            
        }
      </div>
      <div>
        {Object.keys(this.state.chartData2).length &&
        /*
            <Chart
              chartData={this.state.chartData}
              location="ELLE"
              legendPosition="bottom"
            />
*/
            <LineChart
              chartData={this.state.chartData2}
              location="ELLE"
              legendPosition="bottom"
            />
            
        }
      </div>

      </Container>
    );
  }
}

export default Stats;