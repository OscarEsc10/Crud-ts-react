import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1E56F0',
    color: '#fff',
    textAlign: 'center' as const,
    padding: '1rem',
    marginTop: '2rem',
  },
  text: {
    margin: 0,
    fontSize: '0.9rem',
  },
};

export default Footer;
