import React, { useContext } from 'react'
import { Container} from 'react-bootstrap'
import Navbar1 from '../Navbar';
// import AppContext from "./Provider/AppContext";

const Home = () => {
  // const context = useContext(AppContext);

  return (
    <Container>
   
        <h1 className='text-center py-5'>Welcome to HOME PAGE <br/>
        {/* <span><b>{context.G}</b></span> */}
        </h1>
    </Container>
  )
}

export default Home
