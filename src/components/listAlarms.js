import '../css/navbar.css';
import React from "react";
class ListAlarms extends React.Component {
    state = {
        selectedAlarms: [],
        alarmList: localStorage.getItem("alarmList")
    }
    updateSelectedAlarms(index) {
        let selectedAlarms = this.state.selectedAlarms;
        selectedAlarms.push(index);
        this.setState({selectedAlarms: selectedAlarms});
    }

    deleteSelectedElement(index) {
        let selectedAlarms = this.state.selectedAlarms;
        selectedAlarms.splice(selectedAlarms.indexOf(index), 1);
        this.setState({selectedAlarms: selectedAlarms});
    }

    deleteAlarm(index) {
        let alarmList = localStorage.getItem("alarmList");
        alarmList = alarmList ? JSON.parse(alarmList) : [];
        alarmList.splice(index, 1);
        localStorage.setItem("alarmList", JSON.stringify(alarmList));
        let selectedAlarms = this.state.selectedAlarms;
        selectedAlarms.splice(selectedAlarms.indexOf(index), 1);
        selectedAlarms = selectedAlarms.map(i => {return i > index ? i - 1 : i});

        this.setState({selectedAlarms: selectedAlarms});
        this.setState({alarmList: JSON.stringify(alarmList)});
    }
    onEditClick(element) {
        this.props.setAlarmDetails(element);
        this.props.setHeading("Edit")
    }
    getListElement(element, index) {
        let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        return(
            <div className="alarm" key={index}>
                { this.props.heading === "Alarms" ? "" : <div className="deleteBox">
                        <div className="delete" onClick={() => this.deleteAlarm(index)}>
                            X
                        </div>
                    </div>
                }
                <div className="detailsBlock">
                    <div>
                        <span className="time">
                            {(element.hours < 10 ? "0" : "") + element.hours + ":" + (element.minutes < 10 ? "0" : "") + element.minutes}&nbsp;
                        </span>
                        <span className="apm">
                            {element.apm}
                        </span>
                    </div>
                    <div className="alarmDetails">
                        {element.message},&nbsp;{
                        element.days ? (element.days.length === 7 ? "Everyday" : (
                            element.days && element.days.length === 5 && !weekDays.forEach(key => {
                                if(!key.includes(key)) {
                                    return true;
                                }
                            }) ? "Weekdays" : element.days.join(",")
                        )): ""}
                    </div>
                </div>
                { 
                    this.props.heading === "Alarms" ?
                    <div className="checkbox">
                        <input type="checkbox" onClick={(event) => event.target.checked ? this.updateSelectedAlarms(index) : this.deleteSelectedElement(index)}/>
                    </div> : <div className="greaterSign" onClick={() => this.onEditClick(element)}> > </div> 
                }
            </div>
        )
    }
    render() {
        let alarmList = this.state.alarmList;
        alarmList = alarmList ? JSON.parse(alarmList) : [{hours: 6, minutes: 20, apm: "am", message: "Morning Walk", days: ["Monday"]}];
        let displayAlarms = this.props.heading === "Alarms" ? [...Array(alarmList.length).keys()] : this.state.selectedAlarms;
        return (
            <div className="listAlarm">
                {
                    displayAlarms.length === 0 ? <div className="noAlarm">No Alarms {this.props.heading === "Alarms" ? "Set" : "to Edit"}</div> : <div className="alarms">{displayAlarms.map((key, index) => {
                        return alarmList[key] ? this.getListElement(alarmList[key], index) : ""
                    })}</div>
                }
            </div>
        );
    }
}

export default ListAlarms;
