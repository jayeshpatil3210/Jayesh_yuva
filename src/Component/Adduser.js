import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../Redux/Action";

const Adduser = () => {
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [gender, genderChange] = useState("male");
  const [status, statuschange] = useState("Active");
  const [Hobbies, setHobbies] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const userobj = { name, email, gender,Hobbies, status };
    dispatch(FunctionAddUser(userobj));
    navigate("/user");
  };

  const checkBoxes = ["Cricket","Football","Reading"]

  const handleCheckbox = (e,item) => {
    const data = [...Hobbies];
    if(e.target.checked) {
        data.push(item);
        setHobbies(data)
    }
    else{
        const newData= data.filter(i=>item!==i);
        setHobbies(newData);
    }
  }

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Add User</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={name}
                    required="true"
                    onChange={(e) => namechange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email}
                    required="true"
                    onChange={(e) => emailchange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Gender</label>
                  <div class="form-check">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => genderChange(e.target.value)}
                      //   className="form-control"
                    ></input>
                    <label class="form-check-label" for="male">
                      Male
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => genderChange(e.target.value)}
                      //   className="form-control"
                    ></input>
                    <label class="form-check-label" for="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={status}
                    onChange={(e) => statuschange(e.target.value)}
                    className="form-control"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
              <label>Hobbies</label>
                {checkBoxes.map((item)=><div class="form-check"> 
                  <input
                    class="form-check-input"
                    onClick={(e)=>handleCheckbox(e,item)}
                    type="checkbox"
                    // value={Hobbies.indexOf(item)>-1}
                    id="flexCheckDefault"
                    checked={Hobbies.indexOf(item)>-1}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    {item}
                  </label>
                </div>)} 
        
              </div>
            </div>
          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>{" "}
            |
            <Link className="btn btn-danger" to={"/user"}>
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adduser;
