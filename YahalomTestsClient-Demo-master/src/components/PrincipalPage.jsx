import "./cssComponents/principaPage.css"
import { Link } from "react-router-dom";


const MenuListComposition = () => {
  return (
    <div className="wrapper">
      <div className="title">
        <h2 className="containerItem">Administration System-Sela collage</h2>
      </div>
      <div className="mycontainer">
        <b className="containerItem">Main menu</b>
      </div>

      <div className="mycontainer">
        <div className="row a">
          <b className="col-sm ">Choose a field of Study</b>
          <select className="form-select secondary col-sm" aria-label="Default select example">
            <option value="Development">Development</option>
          </select>
        </div>
        <Link className="containerItem" to="/Questions/Table"> Manage Questions</Link>
        <Link className="containerItem" to="/Test/Table"> Manage Test</Link>
        <Link className="containerItem" to="/Reports">Reports</Link>
      </div>
    </div>
  );
}

export default MenuListComposition;