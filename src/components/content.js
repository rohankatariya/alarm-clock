import React from 'react';
import '../css/content.css';
import AddEdit from './addEdit';
import Clock from './alert';
import ListAlarms from './listAlarms';
class Content extends React.Component {
    state = {
        time: new Date().getTime(),
        selectedAlarms: [],
        alarmDetails: undefined,
        alarmWindow: true,
        alarmMessage: {}
    }
    
    componentDidMount() {
        let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = weekDays[new Date().getDay()];
        setInterval(() => {
            let date = new Date();
            if(date.getSeconds() === 0) {
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let arr = localStorage.getItem("alarmList");
                arr = arr ? JSON.parse(arr) : [];
                arr = arr.filter(el => {
                    if(el.apm === "PM") {
                        el.hours = (parseInt(el.hours) + 12).toString();
                    }
                    return el.days && el.days.includes(day) && el.hours === hours.toString() && el.minutes === minutes.toString();
                })[0];
                console.log(arr)
                if(arr) {
                    this.setState({alarmWindow: false});
                    this.props.setHeading("Alarm");
                    arr.stopped = false;
                    this.setState({alarmMessage: arr});
                }
            }
        }, 1000);
    }  
    render() {
        return (
            <div className="content">
              {
                  this.props.heading === "Clock" || this.props.heading === "Alarm" ? 
                    <Clock 
                        alarmWindow={this.state.alarmWindow}
                        setAlarmWindow={(value) => this.setState({alarmMessage: value})}
                        setAlarmMessage={(value) => this.setState({alarmWindow: value})}
                        alarmMessage={this.state.alarmMessage}
                        setHeading={this.props.setHeading}
                    /> : ""
              }
              {
                  this.state.alarmWindow && (this.props.heading === "Alarms" || this.props.heading === "Edit Alarm") ? <ListAlarms setAlarmDetails={(value) => this.setState({alarmDetails: value})} heading={this.props.heading} setHeading={this.props.setHeading} /> : ""
              }
              {
                  this.state.alarmWindow && (this.props.heading === "Add" || this.props.heading === "Edit") ? <AddEdit alarmDetails={this.state.alarmDetails} setHeading={this.props.setHeading} /> : ""
              }
            </div>
          );
    }
}

export default Content;
