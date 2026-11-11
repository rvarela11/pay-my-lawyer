import { NavLink, Outlet } from 'react-router';
import './App.css';
import { navItems } from './routes/nav.ts';

export const App = () => {
  return (
    <>
      <nav className='main-nav'>
        {navItems.map(({ label, to, end }) => (
          <NavLink key={to} to={to} end={end}>
            {label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </>
  );
};
