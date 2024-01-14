import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList, Removeuser } from "../Redux/Action";



const Userlisting = (props) => {

    const tableHeader = ["Code","Name","Email","Gender","Status","Hobbies","Action"];

  useEffect(() => {
    props.loaduser();
  }, []);

  const handledelete = (code) => {
    if (window.confirm("Do you want to remove?")) {
      props.removeuser(code);
      props.loaduser();
      toast.success("User removed successfully.");
    }
  };
  return props.user.loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : props.user.errmessage ? (
    <div>
      <h2>{props.user.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div className="card">
        <div className="card-header">
          <Link to={"/user/add"} className="btn btn-success">
            Add User [+]
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
               {tableHeader.map(item=><td>{item}</td>)}

              </tr>
            </thead>
            <tbody>
              {props.user.userlist &&
                props.user.userlist.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.gender}</td>
                    <td>{item.status}</td>
                    {/* {item.Hobbies&&<td>{...item?.Hobbies}</td>} */}
                    {/* <span class="badge bg-secondary">New</span> */}
                    <td>
                        {item?.Hobbies&&item?.Hobbies?.map(i=><span class="badge bg-secondary mx-2">{i}</span>)}
                    </td>
                    <td style={{paddingRight:"5px"}}>
                      <Link
                        to={"/user/edit/" + item.id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>{"   "}
                      
                      <button
                        onClick={() => {
                          handledelete(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loaduser: () => dispatch(FetchUserList()),
    removeuser: (code) => dispatch(Removeuser(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);
