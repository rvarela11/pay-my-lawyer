import { Link } from '@mui/material';
import { Outlet } from 'react-router';
import styles from './App.module.css';
import { Footer } from './components/Footer/Footer.tsx';
import { Header } from './components/Header/Header.tsx';

export const App = () => {
  return (
    <>
      {/* Skip link (WCAG 2.4.1): hidden until focused; lets keyboard users bypass the header. Targets <main tabIndex={-1}> so it can take focus. */}
      <Link className={styles.skipLink} href='#main'>
        Skip to content
      </Link>
      <Header />
      <main id='main' tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
