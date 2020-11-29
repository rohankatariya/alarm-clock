import {useState} from "react";
import './App.css';
import NavBar from './components/navbar';
import Content from './components/content';
function App() {
  const [heading, setHeading] = useState("Clock");
  return (
    <div className="main">
      <div className="inner">
        <div className="heading">
          {heading === "Clock" ? "" : <div className="headingElement textleft" onClick={() => setHeading("Edit Alarm")}><button>Edit</button></div>}
          <div className="headingElement">{heading}</div>
          {heading === "Clock" ? "" : <div className="headingElement"><button className="right" onClick={() => setHeading("Add")}>Add</button></div>}
        </div>
        <Content heading={heading} setHeading={setHeading}/>
        {heading !== "Add" && heading !== "Edit" ? <NavBar setHeading={setHeading}/> : ""}
      </div>
    </div>
  );
}

export default App;
