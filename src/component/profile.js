import React from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from "react";

const Profile = ({id,name,email,phone,image,sub_user }) => {
console.log( "id : "+ id  ,
 "name : "+ name,
 "email : " + email , 
 "phone : " + phone, 
 "image : " + image,
 "sub_user" + sub_user );
  return (
    <>
    <Container>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
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
