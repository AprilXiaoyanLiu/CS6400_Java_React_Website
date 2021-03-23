import React from 'react';
import { Link } from 'react-router-dom';


function AnimalDetailSection() {
  return (
    <header style={headerStyle}>
      <h3>Animal Detail</h3>
      
    </header>
  )
}

const headerStyle = {
  background: '#b2b2b2',
  color: '#fff',
  textAlign: 'center',
  padding: '20px',
}

const linkStyle = {
  color: '#b2b2b2',
  textDecoration: 'none'
}

export default AnimalDetailSection;