import { FC } from 'react';
import "../css/overlay.scss";

const Overlay: FC<OverlayProps> = (props) => {
  const { loader } = props;

  return (
    <div className="overlay">
      {loader ? <div className="loading">
        <span className="loader"></span>
      </div> : null}
    </div>
  );
};

export default Overlay;
