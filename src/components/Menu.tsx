import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/menu.scss";
import { IoPerson, IoPricetag, IoImage } from "react-icons/io5";

const Menu: FC<MenuProps> = (props) => {
  const { show, action } = props;
  const navigate = useNavigate();
  const clickMenu = (target: string) => {
    navigate("/" + target);
    action();
  }
  return (
    <nav className={show ? "" : "hide"}>
      <ul>
        <li onClick={() => clickMenu("items")}><IoImage />Items</li>
        <li onClick={() => clickMenu("authors")}><IoPerson /> Authors</li>
        <li onClick={() => clickMenu("tags")}><IoPricetag />Tags</li>
      </ul>
    </nav>
  );
};

export default Menu;
