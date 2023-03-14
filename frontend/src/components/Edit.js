import React, {useState, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import Datas from "./Datas";
import { v4 as uuid } from "uuid";
import {Link,useNavigate} from "react-router-dom";

function Edit(){
    const [name, setName] = useState("");
    const[description, setDescription] = useState("");
    const [_id, setId] = useState("");

    let history = useNavigate();

    var index = Datas.map(function(e){
        return e._id
    }).indexOf(_id);

    const handleSubmit=(e) => {
        e.preventDefault();

       let a = Datas[index];
       a.name = name;
       a.description = description;

        history("/");
    }

    useEffect(() =>{
        setName(localStorage.getItem('Name'))
        setDescription(localStorage.getItem('Description'))
        setId(localStorage.getItem('Id'))
    },[])


    return(
        <div>
            <Form className="d-grid gap-2" style={{margin:"15rem"}}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="text" placeholder="Enter Name" value={name} required onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Control type="text" placeholder="Enter Description" value={description} required onChange={(e) => setDescription(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button onClick={(e) => handleSubmit(e)} type="submit">Update</Button>
        </Form>
        </div>
    )

}

export default Edit;