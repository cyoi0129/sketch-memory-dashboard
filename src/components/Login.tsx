import { FC, useState } from 'react';
import { Overlay } from "./";
import { userLogin } from '../app/firebase';
import Cookies from 'js-cookie';
import { IoCloseOutline } from "react-icons/io5";
import "../css/login.scss";

const Login: FC<LoginProps> = (props) => {
  const { action } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /**
   * Login process
   */
  const doLogin = async (): Promise<void> => {
    setLoading(true);
    const result = await userLogin(email, password);
    if (result) {
      action(true);
      Cookies.set("user", result);
      setLoading(false);
    } else {
      alert("Login Failed!");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="login">
        <div>
          <dl>
            <dt>Email</dt>
            <dd><input name="email" type="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} /></dd>
            <dt>Password</dt>
            <dd><input name="password" type="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} /></dd>
          </dl>
          <button disabled={email === "" || password === ""} onClick={doLogin}>Login</button>
        </div>
      </div>
      <div className="close_login" onClick={() => action(false)}><IoCloseOutline /></div>
      <Overlay loader={loading} />
    </>
  );
};

export default Login;
