import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>User Manager</h1>
        <nav style={styles.nav}>
          <a href="#" style={styles.link}>Users</a>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#1E56F0',
    padding: '1rem 2rem',
    color: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center',
    maxWidth: '1200px',  
    margin: '0 auto',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'opacity 0.2s',
    cursor: 'pointer',
  },
};

export default Header;
