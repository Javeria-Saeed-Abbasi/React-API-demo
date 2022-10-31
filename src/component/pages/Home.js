import React, { useContext, useEffect, useState } from 'react'
import { Container} from 'react-bootstrap'
import Navbar1 from '../Navbar';
import AppContext from "../../Provider/AppContext";
import Trainers from './Trainers';

const Home = () => {
  const [ username , setUsername] = useState('');
  const context = useContext(AppContext);

  useEffect(() => {
 if (localStorage.getItem('type') === 'google' ) {
  const g_username = localStorage.getItem('username');
  context.setG_name(g_username);
  setUsername(g_username);
  console.log(g_username);

 } else if(localStorage.getItem('type') === 'simpleUser' ) {
  const trainerName = localStorage.getItem('trainerName');
  setUsername(trainerName);
  console.log(trainerName);
 }
  
  }, []);

  // const context = useContext(AppContext);
  // console.log(context.g_name);
  return (
    <Container>
   
        <h1 className='text-center py-5'>Welcome to Home Page <span className='text-success'>{username}</span><br/>
        {/* <span><b>{context.G}</b></span> */}
        </h1>
    </Container>
  )
}

export default Home
