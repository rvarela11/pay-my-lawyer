import { NavLink, Route, Routes } from 'react-router';
import './App.css';
import { About } from './pages/About.tsx';
import { Contact } from './pages/Contact.tsx';
import { Home } from './pages/Home.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { Products } from './pages/Products.tsx';

export const App = () => {
  return (
    <>
      <nav className='main-nav'>
        <NavLink to='/' end>
          Home
        </NavLink>
        <NavLink to='/products'>Products</NavLink>
        <NavLink to='/about-us'>About us</NavLink>
        <NavLink to='/contact-us'>Contact us</NavLink>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};
