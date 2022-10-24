import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import pdfImg from "../../images/pdfImg.jpg";
import DummyAvatar from "../../images/dummy-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../Provider/AppContext";
import axiosconfig from "../../Provider/Axios";

const Trainers = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [data, setData] = useState([]);
  const context = useContext(AppContext);

  useEffect(() => {
    getTrainerData();
  }, []);

  //Get Trainers Data FROM API:
  const getTrainerData = async () => {
    await axiosconfig
      .get("trainers", {
        headers: {
          Authorization: `Bearer ${context.token}`,
        },
      })
      .then((response) => {
        // handle success
        const data1 = response.data;
        console.log(data1.data, "Trainers Data");
        setData(data1?.data);
        setSelectedFile(data1?.data.image);
       
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  // For File Selection:
  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0].type === "text/plain") {
      setSelectedFile(DummyAvatar);
      alert("Selected file is not acceptable");
    } else if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpg" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]));
      alert("Selected File is Image");
    } else if (event.target.files[0].type === "application/pdf") {
      setSelectedFile(pdfImg);
      alert("Selected File is PDF");
    }
  };
  // For New File Upload:
  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", selectedFile);
  };

  // For Remove Profile Pic to default pic:
  const deleteSelectedFile = () => {
    setSelectedFile(data.image);
  };

  //For Navigate To Profile
  // const navigate = useNavigate();

  // const navigateToProfile = (element) => {
  //   navigate('/profile', {
  //     data: element,
  //   });
  //  };
  return (
    <Container className="profile">
      <h1>Trainer's PAGE</h1>
    {
      data.map((element, index) => {

        return(
          <Card style={{ width: "18rem" }} key={index}>
            <Card.Img
              variant="top"
              src={selectedFile}
              alt="Trainer's Image"
              width="18rem"
              height="215px"
            />
            <Form.Group controlId="formFile" className="wrapper mb-3">
              <Form.Label className="btnimg">
                <FaEdit color={"black"} />
              </Form.Label>
              <Form.Control type="file" onChange={fileSelectedHandler} />
            </Form.Group>
    
            <Button
              type="button"
              className="deletebtn"
              onClick={deleteSelectedFile}
            >
              <FaTrashAlt color={"black"} />
            </Button>
    
            <Card.Body>
              <Card.Title>Name: {element.name}</Card.Title>
              <Card.Text>
                {/* <b>Id:</b> {element.id}
                <br />
                <b>Email:</b> {element.email}
                <br />
                <b>Phone:</b> {element.phone} */}
            
                <b>Job:</b> {element.job}
                <br />
                <b>Certifications: </b>{element.certifications}
              </Card.Text>
              <Button variant="primary" as={Link} to={{pathname:`/profile:${element.id}`,
                                                        state: [{element}]}}>
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
          );
      })
    }
      

    </Container>
  );
};

export default Trainers;
