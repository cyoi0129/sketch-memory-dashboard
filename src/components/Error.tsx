import { FC } from 'react';
import { Overlay } from "./";
import { IoCloseOutline } from 'react-icons/io5';
import '../css/error.scss';

const Error: FC<ErrorProps> = (props) => {
  const { message, action } = props;

  return (
    <>
      <div className='error'>
        <div className='message'>
          <h2>Error</h2>
          <p>{message}</p>
          <button onClick={() => action()}>OK</button>
        </div>
      </div>
      <div className="close_login" onClick={() => action()}><IoCloseOutline /></div>
      <Overlay />
    </>
  );
};

export default Error;
