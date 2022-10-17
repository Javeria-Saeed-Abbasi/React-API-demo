import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from "react";
import { FaEdit} from "react-icons/fa";
import { App } from 'react-bootstrap-icons';
import { AppCss } from "../App.css";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { baseURL } from '../App';

const Profile = ({id,name,email,phone,image}) => {
  // const [displayPic ,setDisplayPic] = useState (false);
  const [selectedFile, setSelectedFile] = useState(image);
  // const imageMimeType = /image\/(png|jpg|jpeg)/i;

// console.log( "id : "+ id  ,
//  "name : "+ name,
//  "email : " + email , 
//  "phone : " + phone, 
//  "image : " + image,
//  );
 const fileSelectedHandler = (event) =>{
   console.log(event.target.files[0]);
   if (event.target.files[0].type === 'image/jpeg') {
     setSelectedFile(URL.createObjectURL(event.target.files[0]));
   }
   else {
    alert("Selected file is not png/jpg/jpeg!")
   }
  console.log(selectedFile.type);

 }
 const fileUploadHandler = () =>{
const fd = new FormData();
    fd.append("image", selectedFile);
  
 }

  return (
    <>
    <Container className='profile'>
    <Card style={{ width: '18rem' }}>
{/* {!displayPic ? (
  <Card.Img variant="top" src={image} alt="profile_pic" width="18rem"/>
) : (
)} */}
<Card.Img variant="top" src={selectedFile} alt="profile" width="18rem"/>
      <Form.Group controlId="formFile" className="wrapper mb-3">
        <Form.Label className='btnimg'><FaEdit/></Form.Label>
        <Form.Control type="file" onChange={fileSelectedHandler}/>
        {/* <Button onClick={fileUploadHandler}>Upload</Button> */}
      </Form.Group>
      
      <Card.Body>
        <Card.Title>Name: {name}</Card.Title>
        <Card.Text>
        Email: {email}
        <br/>
        Phone: {phone}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Container>

    </>
  )
}

export default Profile
