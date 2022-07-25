import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAxios } from "../../createInstance";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { loginSuccess } from "../../redux/authSlice";
import "./home.css";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { allUsers, msg } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = createAxios(dispatch, loginSuccess, currentUser);

  const handleDelete = (id) => {
    deleteUser(currentUser?.accessToken, dispatch, id, axiosJWT);
    if (msg.status === 403) {
      toast.error(msg.msg);
    } else if (msg.status === 200) {
      toast.success(msg.msg); 
    }
  };

  useEffect(() => {
    currentUser
      ? getAllUsers(currentUser.accessToken, dispatch, axiosJWT)
      : navigate("/login");
  }, [navigate]);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">{`Your role: ${
        currentUser?.admin ? "Admin" : "User"
      }`}</div>
      <div className="home-userlist">
        {allUsers?.map((user, index) => {
          return (
            <div className="user-container" key={index}>
              <div className="home-user">{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
