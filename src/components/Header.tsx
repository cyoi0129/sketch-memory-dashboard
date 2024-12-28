import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Login } from './';
import '../css/header.scss';
import { RiSketching } from "react-icons/ri";
import { IoLogInOutline, IoLogOutOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { removeUserLogin } from '../app/firebase';

const Header: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  /**
   * Logout process
   */
  const logoutProcess = async (): Promise<void> => {
    await removeUserLogin();
    alert("Logout Successful!");
  }

  /**
   * Login process
   * @param login 
   */
  const loginProcess = (login: boolean): void => {
    if (login) setIsLogin(true);
    setShowLogin(false);
  }
  return (
    <>
      <header>
        <Link to="/"><h1><RiSketching />Sketch Memory</h1></Link>
        <ul>
          {isLogin ? <li onClick={logoutProcess}><IoLogOutOutline /></li> : <li onClick={() => setShowLogin(true)}><IoLogInOutline /></li>}
          <li onClick={() => setIsShowMenu(!isShowMenu)}>{isShowMenu ? <IoCloseOutline /> : <IoMenuOutline />}</li>
        </ul>
      </header>
      <Menu show={isShowMenu} action={() => setIsShowMenu(false)} />
      {showLogin ? <Login action={loginProcess} /> : null}
    </>
  );
};

export default Header;
