import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useEffect, useState } from "react";
import Profile from "./component/profile";

export const baseURL = "https://buybestthemes.com/findmyfitness_api/api";

function App() {
  const [data, setData] = useState({})
  const [displayProfile ,setDisplayProfile] = useState (false);
  // Token State:
  const [token, setToken] = useState("")
  //Login Use States:
  const [email1, setemail1] = useState("trainer@gmail.com");
  const [password1, setpassword1] = useState("admin123");

  //Register Use States: 
  // const [name, setname] = useState("");
  // const [email, setemail] = useState("");
  // const [roles, setroles] = useState("");
  // const [phone, setphone] = useState("");
  // const [password, setpassword] = useState("");
  // const [confirm_password, setconfirm_password] = useState("");
  
  // const token =
  // "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGQ4OWYwNWFkZGM5ZmZlNGNjNGU1ZWU4NWQyOWMxODc1MGUwNzc5MzNlOGMwMDQ2NjIyMTBhYmYwZmViMjllYjg3MjI3OWZkNjgzZDFiNGMiLCJpYXQiOjE2NjU1NTE4NzIuMjgyMzAyLCJuYmYiOjE2NjU1NTE4NzIuMjgyMzA1LCJleHAiOjE2OTcwODc4NzIuMjgxMTU0LCJzdWIiOiIxNjQiLCJzY29wZXMiOltdfQ.RC0iCu3Z77FdfLzc3TNPJ3IVzloLlxP8wRNRHI5w7jrCjvfc-pRAD7jJNrRycXcZnBLxZ1OGncTXyUQPiscx7nfMgNYCXVt6BPPs_PUvBA5quP8ZgD4z3vsoJWxMgFvJAaMS_7-c7LWe5pjoQF40l6Uuv8gR-6e2DHhdw97C2PaA1slhSB0E9dGoOE8nwJYCIL4x7kHQ0IImm9hoIv1VW9ptmTqRSr9qU1ltxCCn6b2j7abWjkrpAl-azgmqzlV3RGyV0ZZpz_u4VBOXwRkjGdvrbcikfVO5nHZgsDoHed1DV4wnGz2bb7dgX64gGH2LD2c6CEvrNMUuLjH2Gred6rFAdMSK5YVddztvDaUyDAW-2BhLW5-WwSjr-LM6OqgQxX7yYmaDMgEfoggq0bPbbo-6X2IL5vGoygCmjRKK6aJxo5geFvcz8jXVAawrWaL7btes59nGzYh7KJptCwTVAzboBujxZGQU0y5AzBFAzZAudTjcpaiRvAX9iCUbb_rtRL0TiaSDQGhcWXmmYSl29-QCdjnQNAB3NKyX86FHeRsrIRekq6Dy1pFsar4qJJ-7LB6LIpJVvuZzdExQh8UOfqppn3rhydeuzipdfBFyo2CGI2IybP1ppqWGzteic-gRjZ2oL3PND9H8ZENGDlyMrGHZ3OK78LInDelpq4wY_zs";
  // GET API

  useEffect(() => {
    console.log(data,"hellodata");
    let token1 = localStorage.getItem('token');
    setToken(token1)
    console.log(token)
   
  }, [token])
   
  const findMyFitness = async() => {
       await axios
      .get(baseURL+"/my-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // handle success
        console.log(response);
        const data1 = response.data;
        console.log(data1, 'coming');
        setData(data1);
       setDisplayProfile(true);
        // const parentToChild = () => {
        //   setData(data1);
        // }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };



  // LOGIN POST API
  const postLoginData = (data) => {
    console.log(email1,password1);
    axios.post(baseURL+'/login',{
      email:email1,
      password:password1
    },{
      headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                // Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
    }).then(res=>{
      console.log(res.data.token, "RESPONSE")
      localStorage.setItem('token', res.data.token, "RESPONSE");
      findMyFitness();
    }).catch(err=>{
      console.log(err, "ERROR");
    })
  };

  // REGISTER POST API
  // const registerPostData = () =>{
  //   axios.post(baseURL+'/register',{
  //    name: name,
  //    email: email,
  //    roles:roles,
  //    phone:phone,
  //    password: password,
  //    confirm_password: confirm_password,
  //   },{
  //     headers: {
  //               "Content-Type": "application/json",
  //               "Access-Control-Allow-Origin": "*",
  //               // Authorization: `Bearer ${token}`,
  //               Accept: "application/json",
  //             },
  //   }).then(res=>{
  //     console.log(res)
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // }
  return (
    <div className="container">
{!displayProfile ? (<>
  <div className="login-form">
      <h2 className="text-center"> LogIn Form </h2>
      <input
      
        onChange={(e) => {
          setemail1("trainer@gmail.com");
        }}
      />
      <input
        onChange={(e) => {
          console.log(e.target.value);
          setpassword1("admin123");
        }}
      />
      <button
        onClick={() => {
          postLoginData();
        }}
      >
        Submit
      </button>
      </div>
</>) : ( <Profile {...data}/>)
}

      
      {/* <div className="register-div pt-4">
        <h2 className="text-center"> Register Form </h2>
      <input
        onChange={(e) => {
          console.log(e.target.value);
          setname(e.target.value);
        }}
      />
      <input
        onChange={(e) => {
          console.log(e.target.value);
          setemail(e.target.value);
        }}
      />
        <input
        onChange={(e) => {
          console.log(e.target.value);
          setroles(e.target.value);
        }}
      />
        <input
        onChange={(e) => {
          console.log(e.target.value);
          setphone(e.target.value);
        }}
      />
        <input
        onChange={(e) => {
          console.log(e.target.value);
          setpassword(e.target.value);
        }}
      />
       <input
        onChange={(e) => {
          console.log(e.target.value);
          setconfirm_password(e.target.value);
        }}
      />
      <button
        onClick={() => {
          registerPostData();
        }}
      >
        Submit
      </button>
      </div> */}
     
    </div>
  );
}

export default App;
