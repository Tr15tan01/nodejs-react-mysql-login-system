import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [submessage, setSubessage] = useState("");

  const url1 = "http://localhost:3000";
  const url2 = "http://localhost:3000/subdata";
  const url3 = "http://localhost:3000/insert";

  const fetchData = () => {
    fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  };

  const fetchSubData = () => {
    fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        setSubessage(data.message);
      });
  };

  const postData = (e) => {
    e.preventDefault();
    fetch(url3, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(indata),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("posted", data);
        setIndata({ name: "", age: null, comment: "" });
      });
  };

  const [indata, setIndata] = useState({ name: "", age: null, comment: "" });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value, name);
    setIndata({ ...indata, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(indata, "submitted");
  };

  console.log(indata);

  return (
    <Container
      fluid="lg"
      className=""
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="text-center">
        <h3>Data:{message} </h3>
        <h4>Subdata: {submessage}</h4>
        <Button variant="primary" className="px-3" onClick={fetchData}>
          Get The Data
        </Button>
        <Button variant="danger" className="px-3" onClick={fetchSubData}>
          Get Sub Data
        </Button>
        <Button variant="warning" className="px-3" onClick={postData}>
          Post the Data
        </Button>
        <Form onSubmit={postData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="age"
              name="age"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter comment"
              name="comment"
              onChange={changeHandler}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default App;
