import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchUserObj, FunctionUpdateUser } from "../Redux/Action";

const Updateuser = () => {
  const [id, idchange] = useState(0);
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [gender, genderchange] = useState("");
  const [status, statuschange] = useState("staff");
  const [Hobbies, setHobbies] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();

  const userobj = useSelector((state) => state.user.userobj);

  const handlesubmit = (e) => {
    e.preventDefault();
    const userobj = { id, name, email, gender, status,Hobbies };
    dispatch(FunctionUpdateUser(userobj, id));
    navigate("/user");
  };

  const checkBoxes = ["Cricket","Football","Reading"];

  const handleCheckbox = (e,item) => {
    debugger
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

  useEffect(() => {
    dispatch(FetchUserObj(code));
  }, []);

  useEffect(() => {
    if (userobj) {
      idchange(userobj.id);
      namechange(userobj.name);
      emailchange(userobj.email);
      genderchange(userobj.gender);
      statuschange(userobj.status);
      setHobbies(userobj?.Hobbies);
    }
  }, [userobj]);

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
                  <label>Id</label>
                  <input
                    value={id || ""}
                    disabled="disabled"
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={name || ""}
                    onChange={(e) => namechange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email || ""}
                    onChange={(e) => emailchange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                {/* <div className="form-group">
                                    <label>Phone</label>
                                    <input value={gender || ''} onChange={e => genderchange(e.target.value)} className="form-control"></input>
                                </div> */}
                <label>Gender</label>
                <div class="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    checked={gender === "male"}
                    onChange={(e) => genderchange(e.target.value)}
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
                    id="female"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => genderchange(e.target.value)}
                    //   className="form-control"
                  ></input>
                  <label class="form-check-label" for="female">
                    Female
                  </label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={status || ""}
                    onChange={(e) => statuschange(e.target.value)}
                    className="form-control"
                  >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
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
                    checked={Hobbies?.indexOf(item)>-1}
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

export default Updateuser;
