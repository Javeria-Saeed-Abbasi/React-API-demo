import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from "react";
import { FaEdit} from "react-icons/fa";
import { FaTrashAlt} from 'react-icons/fa';
import { App } from 'react-bootstrap-icons';
import AppCss from "../App.css";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { baseURL } from '../App';
import pdfImg from '../images/pdfImg.jpg';
import DummyAvatar from '../images/dummy-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export let token1 = localStorage.getItem('token');

const Profile = ({setToken}) => {
  const [selectedFile, setSelectedFile] = useState('');
  const [data, setData] = useState({})

  // const imageMimeType = /image\/(png|jpg|jpeg)/i;

// console.log( "id : "+ id  ,
//  "name : "+ name,
//  "email : " + email , 
//  "phone : " + phone, 
//  "image : " + image,
//  );
   useEffect(() => {
    findMyFitness();

   }, [])
   
const findMyFitness = async() => {
  await axios
 .get(baseURL+"/my-data", {
   headers: {
     Authorization: `Bearer ${token1}`,
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

 // For Remove Profile Pic to default pic:
 const deleteSelectedFile = () =>{
  setSelectedFile(data.image);
 }

// For Logut 
const profileLogout = () =>{
  const logOutItem = localStorage.removeItem('token');
  console.log(logOutItem);
  setToken(null);
}
  return (
    <>
    <Container className='profile'>
      <div className='d-flex mx-auto'>
      <Button variant="primary" className="logout-btn" onClick={profileLogout}>Logout</Button>
      </div>
    <Card style={{ width: '18rem' }}>
{/* {!displayPic ? (
  <Card.Img variant="top" src={image} alt="profile_pic" width="18rem"/>
) : (
)} */}
<Card.Img variant="top" src={selectedFile} alt="profile" width="18rem" height="215px"/>
      <Form.Group controlId="formFile" className="wrapper mb-3">
        <Form.Label className='btnimg'><FaEdit/></Form.Label>
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
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Container>

    </>
  )
}

export default Profile
