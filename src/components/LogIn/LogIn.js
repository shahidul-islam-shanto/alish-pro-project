import React, { useState } from 'react';
import { useContext } from 'react';
import { UseContext } from './Context';
import './LogIn.css';
import { useHistory, useLocation } from 'react-router';
import { 
  handleFacebookSignIn, 
  handleFacebookSignOut, 
  handleGoogleSignIn, 
  handleGoogleSignOut, 
  initializeLogIn 
} from './LogInManager';




const LogIn = () => {
  const [newUser, setNewUser] = useState(false)
 
  // const [product, setProject] = useState({
  //   isFbSignedIn: false,
  //   name: '',
  //   photo: '',
  //   email: ''
  // })
    const [user, setUser] = useState({
       isSignedIn: false,
       name: '',
       password: '',
       photo: '',
       email: '',
       error: '',
       success: false,
    })
   const [logIn, setLogIn] = useContext(UseContext)
   const history = useHistory()
   const location = useLocation()
   let { from } = location.state || { from: { pathname: "/" } };
   initializeLogIn()


const googleSignIn = () => {
  handleGoogleSignIn()
   .then(res => {
    setLogIn(res)
    setUser(res)
    history.replace(from);
   })
}
const googleSignOut = () => {
  handleGoogleSignOut()
    .then(res => {
      setLogIn(res)
      setUser(res)
    })
}    

const facebookSignIn = () => {
  handleFacebookSignIn()
    .then(res => {
      setUser(res)
      setLogIn(res)
      history.replace(from);
    })
}
const facebookSignOut = () => {
  handleFacebookSignOut()
     .then(res => {
       setUser(res)
       setLogIn(res)
     })
}

// form logIn or logOut
    const handleChange = (e) => {
       let isFieldValid = true;
        if (e.target.name === 'email') {
          isFieldValid =  /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
          const passwordValidation = e.target.value.length > 6;
          const passwordNumber = /\d{1}/.test(e.target.value)
          isFieldValid = passwordValidation && passwordNumber;
        }
        if (isFieldValid) {
         const newUserInfo = {...user }
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo)
        }
    }
   
  const handleSubmit = (e) => {
  if (newUser && user.email && user.password) {
    //firebase password setUp
        
   }
  //sign in 
  if (!newUser && user.email && user.password) {
    
      
     }
  e.preventDefault()
  }

    return (
    <div className='logIn-area'>

      {/* google logIn or logOut */}
        {user.isGoogleSignedIn ? <button onClick={googleSignOut}>Sign Out Google</button> :
           <button onClick={googleSignIn}>Sign In Google</button>}
        { user.isGoogleSignedIn && 
            <div>
                <p>Welcome, {user.name}</p>
                <p>Email: {user.email}</p>
                <img src={user.photo} alt="" />
             </div>
          }
       
      {/* facebook logIn or logOut */}
        {user.isFbSignedIn ? <button className='btn' onClick={facebookSignOut}>Sign Out Facebook</button> : 
           <button onClick={facebookSignIn}>Sign In Facebook</button>}
        {user.isFbSignedIn && 
            <div>
               <p>Welcome, {user.name}</p>
               <p>Email: {user.email}</p>
              
             </div>
            }

        {/* form logIn or logOut */}
            <h1>Form App</h1>
              <input 
              type="checkbox" 
              onChange={()=> setNewUser(!newUser)} 
              name="newUser" 
              id="newUser" />
            <label htmlFor="newUser">New User Sign Up</label>
           <form onSubmit={handleSubmit}>
           {newUser && <div>
              <label htmlFor="email">Name: </label>
                <input 
                type="text" 
                id='name' 
                name='name' 
                onChange={handleChange}
                placeholder='Your Own Name' 
                required />
            </div>
            }
            <div>
              <label htmlFor="email">Email: </label>
                <input 
                type="email" 
                id='email' 
                name='email' 
                onChange={handleChange}
                placeholder='Your Own Email' 
                required />
            </div>
            <div>
              <label htmlFor="name">Password: </label>
                <input 
                type="password" 
                id='password' 
                name='password'               
                onChange={handleChange}
                placeholder='Your Own Password'  
                required />
            </div>
            {/* <button type='submit'>Submit</button> */}
            <input type="submit" className='btn' value={newUser ? 'Sign Up' : 'Sign In'} />
           </form>
           {user.error && <p style={{color: "red"}}>error! Email-already-in-use</p>}
           {user.success &&  <p style={{color: "green"}}>User {newUser ? "create" : "logged In"} successful</p>} 

  </div>
    );
};

export default LogIn;