import NavBar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        {' '}
        <NavBar />{' '}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
