import '../css/navbar.css';
import React from "react";
class AddEdit extends React.Component {
  state = this.props.alarmDetails ? this.props.alarmDetails : {
    hours: "HH",
    minutes: "MM",
    apm: "AM",
    snooze: false,
    message: "",
    days: [],
    sound: "",
    isValide: true
  } 
  handleSave() {
    let state = this.state;
    state.time = state.hours * 60 * 60 + state.minutes * 60 + (state.apm === "AM" ? 0 : 12 * 60 * 60);
    if(state.hours === "HH" || state.minutes === "MM" || state.days.length === 0 || !state.sound) {
      this.setState({isValide: false});
    } else {
      this.setState({isValide: true});
      let alarms = localStorage.getItem("alarmList");
      alarms = alarms ? JSON.parse(alarms) : [];
      if(this.props.alarmDetails) {
        let alarmDetails = JSON.stringify(this.props.alarmDetails);
        let index = alarms.findIndex((details) => JSON.stringify(details) === alarmDetails);
        alarms[index] = state;
      } else {
        alarms.push(state);
      }
      localStorage.setItem("alarmList", JSON.stringify(alarms));
      this.props.setHeading("Alarms");
    }
  }

  handleDiscard() {
    this.props.setHeading("Alarms");
  }
  onRepeatChange(e, value) {
    console.log(this.state)
    let days = this.state.days;
    if(e.target.checked) {
      days.push(value);
    } else {
      days.splice(days.indexOf(value), 1);
    }
    this.setState({days: days})
  }
  render() {
    let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let sounds = ["None", "Radar", "Beep"];
    let alarmDetails = this.props.alarmDetails ? this.props.alarmDetails : {};
    return (
      <div className="addAlarm">
        <div>
          <div className="timeSelect">
            <div>
              <select defaultValue={alarmDetails.hours ? alarmDetails.hours : "HH"} className="select" id="hh" onChange={(e) => this.setState({"hours": e.target.value})}>
                {["HH", ...Array(12).keys()].map(key => {return <option key={key}>{key}</option>})}
              </select><span style={{color: "red"}}>*</span>
            </div>
            <div>
              <select defaultValue={alarmDetails.minutes ? alarmDetails.minutes : "MM"} className="select" onChange={(e) => this.setState({"minutes": e.target.value})}>
                {["MM", ...Array(60).keys()].map(key => {return <option key={key}>{key}</option>})}
              </select><span style={{color: "red"}}>*</span>
            </div>
            <div>
              <select className="select" defaultValue={alarmDetails.apm ? alarmDetails.apm : "AM"} onChange={(e) => this.setState({"apm": e.target.value})}>
                {["AM", "PM"].map(key => {return <option key={key}>{key}</option>})}
              </select><span style={{color: "red"}}>*</span>
            </div>
          </div>
          <div className="timeSelect">
            <div>Snooze:</div>
            <div><input type="checkbox" defaultChecked={alarmDetails.snooze ? alarmDetails.snooze : false} onChange={(e) => this.setState({"snooze": e.target.checked})}/></div>
          </div>
          <div className="timeSelect">
            <div>Label:</div>
            <div><input type="text" defaultValue={alarmDetails.message ? alarmDetails.message : ""} onChange={(e) => this.setState({"message": e.target.value})}/></div>
          </div>
          <div className="repeatLabel">
            Repeat<span style={{color: "red"}}>*</span>
          </div>
          {
            weekDays.map(key => {
              return <div className="timeSelect listElement" key={key}>
                <div>{key}</div>
                <div><input type="checkbox" defaultChecked={alarmDetails.days && alarmDetails.days.includes(key) ? true : false} onChange={(e) => this.onRepeatChange(e, key)}/></div>
                </div>
            })
          }
          <div className="repeatLabel">
            Sounds<span style={{color: "red"}}>*</span>
          </div>
          <div onChange={(e) => this.setState({"sound": e.target.value})}>
          {
            sounds.map(key => {
              return <div className="timeSelect listElement" key={key}>
                <div>{key}</div>
                <div><input defaultChecked={alarmDetails.sound === key} type="radio" name="sound" value={key}/></div>
                </div>
            })
          }
          </div>
          <div className="bottomBox"></div>
          <div className="addEditButtons">
            {this.state.isValide ? "" : <span style={{color: "red"}}>All field marked * are required</span>}
            <button onClick={() => this.handleSave()}>Save Alarm</button>
            <button onClick={() => this.handleDiscard()}>Discard</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEdit;
