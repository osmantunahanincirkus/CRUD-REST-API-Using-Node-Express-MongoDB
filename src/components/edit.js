import React, {useState, useEffect} from 'react';
import {Button, Form} from 'react-bootstrap'
import "bootstrap/dist/css/bootstap.min.css";
import datas from './datas';
import {} from "uuid";
import {Link,useNavigate} from 'react-router-dom'

function Edit(){
    const [name,setname] = useState("");
    const[description,setdescription] = useState("");
    const [id, setId] = useState("");

    let history = useNavigate();

    var index = datas.map(function(e){
        return e.id
    }).indexOf(id);

    const handleSubmit=(e) => {
        e.preventDefault();

       let a = datas[index];
       a.name = name;
       a.description = description;

        history("/");
    }

    useEffect(() =>{
        setname(localStorage.getItem('Name'))
        setdescription(localStorage.getItem('Description'))
        setId(localStorage.getItem('Id'))
    },[])


    return(
        <div>
            <Form className="d-grid gap-2" style={{margin:"15rem"}}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="text" placeholder="Enter Name" value={name} required onChange={(e) => setname(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Control type="text" placeholder="Enter Description" value={description} required onChange={(e) => setdescription(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button onClick={(e) => handleSubmit(e)} type="submit">Update</Button>
        </Form>
        </div>
    )

}

export default Edit;