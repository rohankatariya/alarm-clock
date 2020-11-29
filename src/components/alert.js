import React from 'react';
import '../css/content.css';
class Clock extends React.Component {
    state = {
        time: new Date().getTime()
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: new Date().getTime() 
            });
        }, 1000);
    }


    onStop() {
        this.props.setAlarmMessage({stoped: true});
        this.props.setAlarmWindow(true);
        this.props.setHeading("Clock");
    }
    getDateTime() {
        let date = new Date(this.state.time);
        let dateString = new Date().toDateString().split(" ");
        let temp = dateString[2];
        dateString[2] = dateString[1] + ",";
        dateString[1] = temp;
        let time = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        };
        return (
            <div className={"dateTime" + (!this.props.alarmWindow ? " backgroundBlack" : "")}>
                <div className="time">
                    { 
                        Object.keys(time).map(key => {
                            return (time[key] < 10 ? "0" : "") + time[key]
                        }).join(":")
                    }
                </div>
                <div className="date">
                    {
                        dateString.join(" ")
                    }
                </div>
                {
                    !this.props.alarmWindow ?
                        <div style={{width: "100%"}}>
                            <div className="message">
                                {this.props.alarmMessage ? this.props.alarmMessage.message : ""}
                            </div>
                        <div>
                            {this.props.alarmMessage.snooze ? <button className="snooze">Snooze</button> : ""}
                            <button className="stop" onClick={() => this.onStop()}>Stop{this.props.alarmWindow}</button>
                        </div>
                        </div> : ""
                }
            </div>
        )
    }    
    render() {
        return (
            <div className="content">
              {
                   this.getDateTime()
              }
            </div>
          );
    }
}

export default Clock;
