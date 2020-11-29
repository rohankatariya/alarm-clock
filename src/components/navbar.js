import '../css/navbar.css';
function NavBar(props) {
  return (
    <div className="navbar">
      <div className="navelement"><button onClick={() => props.setHeading("Clock")}>Clock</button></div>
      <div className="navelement"><button onClick={() => props.setHeading("Alarms")} className="right">Alarms</button></div>
    </div>
  );
}

export default NavBar;
