import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/apiRequest";
import { reset } from "../../redux/authSlice";
import Input from "../InputField/Input";
import "./register.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newUser } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      username,
      password,
    };

    registerUser(newUser, dispatch);
  };

  useEffect(() => {
    if (newUser) {
      if (newUser.status === 403) {
        toast.error(newUser.msg);
      } else if (newUser.status === 201) {
        toast.success(newUser.msg);
        navigate("/login");
        setTimeout(() => {
          dispatch(reset());
        }, 2000);
      }
    }
  }, [newUser]);

  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      <form onSubmit={handleRegister}>
        <Input
          label="EMAIL"
          inputType="email"
          placeholder="Enter your email"
          setData={setEmail}
        />
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
        <button type="submit"> Create account </button>
      </form>
    </section>
  );
};

export default Register;
