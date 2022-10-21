import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useEffect, useState, useContext } from "react";
import { FaEdit} from "react-icons/fa";
import { FaTrashAlt} from 'react-icons/fa';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import pdfImg from '../../images/pdfImg.jpg';
import DummyAvatar from '../../images/dummy-image.jpg';
import { Link } from "react-router-dom";
import Navbar1 from '../Navbar';
import AppContext from '../../Provider/AppContext';
import axiosconfig from '../../Provider/Axios';

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [data, setData] = useState({})
  const context = useContext(AppContext);

  useEffect(() => {
    getMyData();
   }, [])

   //Get My Data:
   const getMyData = async() => {
    await axiosconfig
   .get("my-data", {
     headers: {
       Authorization: `Bearer ${context.token}`,
     },
   })
   .then((response) => {
     // handle success
     const data1 = response.data;
     console.log(data1, 'coming');
     setData(data1);
     setSelectedFile(data1.image);
  
   })
   .catch(function (error) {
     // handle error
     console.log(error);
   });
  };

  // For File Selection:
 const fileSelectedHandler = (event) =>{
  console.log(event.target.files[0]);
  if(event.target.files[0].type === 'text/plain'){
   setSelectedFile(DummyAvatar);
   alert('Selected file is not acceptable');
  }
  
  else if(event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg' || event.target.files[0].type === 'image/jpeg'){
   setSelectedFile(URL.createObjectURL(event.target.files[0]));
   alert('Selected File is Image');
  }
  else if (event.target.files[0].type === 'application/pdf') {
   setSelectedFile(pdfImg);
   alert('Selected File is PDF');
  }
}
 // For New File Upload:
 const fileUploadHandler = () =>{
  const fd = new FormData();
      fd.append("image", selectedFile);
   }
  
   // For Remove Profile Pic :
   const deleteSelectedFile = () =>{
    setSelectedFile(data.image);
   }
  
  return (
    <>
   
   
    <br/>
   
    <Container className='profile'>
      {

      }
    <Card style={{ width: '18rem' }}>
{/* {!displayPic ? (
  <Card.Img variant="top" src={image} alt="profile_pic" width="18rem"/>
) : (
)} */}
    <Card.Img variant="top" src={selectedFile} alt="profile-Image" width="18rem" height="215px"/>
      <Form.Group controlId="formFile" className="wrapper mb-3">
        <Form.Label className='btnimg'><FaEdit color={'black'} /></Form.Label>
        <Form.Control type="file" onChange={fileSelectedHandler}/>
      </Form.Group>

        <Button type="button" className='deletebtn' onClick={deleteSelectedFile}><FaTrashAlt color={'black'} /></Button>
        
      <Card.Body>
        <Card.Title>Name: {data.name}</Card.Title>
        <Card.Text>
        Email: {data.email}
        <br/>
        Phone: {data.phone}
        </Card.Text>
        {/* <Button variant="primary" as={Link}>Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </Container>

    </>
  )
}

export default Profile
