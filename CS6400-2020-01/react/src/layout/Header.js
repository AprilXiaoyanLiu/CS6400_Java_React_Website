import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>AnimalShelter</h1>
      <Link style={linkStyle} to="/Home">Home</Link>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '20px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default Header;