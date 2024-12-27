import { FC, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Header, Footer, ScrollToTop } from './components';
import { Home, List, Item, Author, Tag } from './pages';
import './css/common.scss';
import Cookies from 'js-cookie';

const App: FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    if (!Cookies.get('user')) {
      setIsLogin(false);
      // navigate("/");
    } else {
      setIsLogin(true);
    }
  }, [location]);

  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home login={isLogin} />} />
          <Route path="/items" element={<List />} />
          <Route path="/authors" element={<Author />} />
          <Route path="/tags" element={<Tag />} />
          <Route path="/item/:id" element={<Item />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
