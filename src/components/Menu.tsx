import { FC } from 'react';
import { Link } from 'react-router-dom';
import "../css/menu.scss";
import { IoPerson, IoPricetag, IoImage } from "react-icons/io5";

const Menu: FC<MenuProps> = (props) => {
  const { show } = props;
  return (
    <nav className={show ? "" : "hide"}>
      <ul>
        <li><Link to="/items"><IoImage />Items</Link></li>
        <li><Link to="/authors"><IoPerson /> Authors</Link></li>
        <li><Link to="/tags"><IoPricetag />Tags</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
