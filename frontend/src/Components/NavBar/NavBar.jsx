import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAxios } from "../../createInstance";
import { logoutUser } from "../../redux/apiRequest";
import { logoutSuccess } from "../../redux/authSlice";
import "./navbar.css";
const NavBar = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(dispatch, logoutSuccess, currentUser);
  const navigate = useNavigate();

  const handleHome = () => {
    if (!currentUser) {
      toast.error("You have to login first!");
    }
  };
  const handleLogout = (id) => {
    logoutUser(currentUser?.accessToken, dispatch, axiosJWT, id, navigate);
    toast.success()
  };

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home" onClick={handleHome}>
        Home
      </Link>
      {currentUser ? (
        <>
          <p className="navbar-user">
            Hi, <span>{currentUser.username}</span>
          </p>
          <Link
            to="/logout"
            className="navbar-logout"
            onClick={() => handleLogout(currentUser._id)}
          >
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            Login
          </Link>
          <Link to="/register" className="navbar-register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
