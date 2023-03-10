import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap'
import "bootstrap/dist/css/bootstap.min.css";
import datas from './datas';
import {} from "uuid";
import {Link,useNavigate} from 'react-router-dom'

function Add(){

    const [name,setname] = useState("");
    const[description,setdescription] = useState("");

    let history = useNavigate();

    const handleSubmit=(e) => {
        e.preventDefault();

        const ids = uuid();
        let uniqueId = ids.slice(0,8);

        let a = name,
        b = description;

        datas.push({id: uniqueId, name : a, description : b});

        history("/");
    }

    
    return<div>
        <Form className="d-grid gap-2" style={{margin:"15rem"}}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="text" placeholder="Enter Name" required onChange={(e) => setname(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Control type="text" placeholder="Enter Description" required onChange={(e) => setdescription(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button onClick={(e) => handleSubmit(e)} type="submit">Submit</Button>
        </Form>
    </div>
}

export default Add;