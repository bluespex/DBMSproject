import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, clear }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
           {/* <h1 style={{justifyContent:'flex-start'}} className='athelas f5'>P4 CAFE</h1> */}
          <p onClick={() => onRouteChange('home')} className='f3 link dim black underline ph3 pointer'>Home</p>
          <p onClick={() => onRouteChange('cart')} className='f3 link dim black underline ph3 pointer'>Cart</p>
          <p onClick={() => {onRouteChange('signin'); clear();}} className='f3 link dim black underline ph3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          {/* <h1 style={{justifyContent:'flex-start'}} className='athelas f2'>P4 CAFE</h1> */}
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline ph3 pointer'> Sign In </p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline ph3 pointer'> Register </p>
        </nav>
      );
    }
}

export default Navigation;