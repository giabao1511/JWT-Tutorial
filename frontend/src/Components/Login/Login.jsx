import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Input from "../InputField/Input";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isFetching } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };
    loginUser(user, dispatch);
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.status === 403) {
        toast.error(currentUser.msg);
      } else if (currentUser.status === 200) {
        toast.success(currentUser.msg);
        navigate("/");
      }
    }
  }, [currentUser]);

  return (
    <section className="login-container">
      <div className="login-title"> Log in</div>
      <form onSubmit={handleLogin}>
        <Input
          label="USERNAME"
          inputType="text"
          placeholder="Enter your username"
          setData={setUsername}
        />
        <Input
          label="PASSWORD"
          inputType="password"
          placeholder="Enter your password"
          setData={setPassword}
        />
        {isFetching ? (
          <h1>Loading....</h1>
        ) : (
          <button type="submit"> Continue </button>
        )}
      </form>
      <div className="login-register"> Don't have an account yet? </div>
      <Link className="login-register-link" to="/register">
        Register one for free
      </Link>
    </section>
  );
};

export default Login;
