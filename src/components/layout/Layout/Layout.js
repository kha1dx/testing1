import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../../App';

const Layout = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      {user && <Header />}
      <main style={{ flex: 1, padding: '2rem 0' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;