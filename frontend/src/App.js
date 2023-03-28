import './App.css';
import todoApi from './api/todo.api';
import Todo from './components/todo';

import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [complated, setComplated] = useState('')

  const [editID, setEditId] = useState('');
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editComplated, setEditComplated] = useState('')

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    await axios.get('http://localhost:5000/api/todo')
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleEdit = async (_id) => {
    handleShow();
    await axios.get(`http://localhost:5000/api/todo/${_id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditDescription(result.data.description);
        setEditComplated(result.data.complated);
        setEditId(_id);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure to delete this todo?") === true) {
      await axios.delete(`http://localhost:5000/api/todo/${_id}`)
        .then((result) => {
          if (result.status === 204) {
            toast.success('Todo has been deleted !');
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        })
    }
  }

  const handleUpdate = async () => {
    const url = `http://localhost:5000/api/todo/${editID}`;
    const data = {
      "_id": editID,
      "name": editName,
      "description": editDescription,
      "complated": editComplated
    }

    await axios.put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success('Todo has been updated !');
      })
      .catch((error) => {
        toast.error(error);
      })
  }

  const handleSave = async () => {
    const url = 'http://localhost:5000/api/todo';
    const data = {
      "name": name,
      "description": description,
      "complated": complated
    }

    await axios.post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success('Todo has been added !');
      })
      .catch((error) => {
        toast.error(error);
      })
  }

  const clear = () => {
    setName('');
    setDescription('');
    setComplated('');
    setEditName('');
    setEditDescription('');
    setEditComplated('');
    setEditId('');
  }

  const handleComplatedChange = (e) => {
    if (e.target.checked) {
      setComplated("true");
    }
    else {
      setComplated("false");
    }
  }

  const handleEditComplatedChange = (e) => {
    if (e.target.checked) {
      setEditComplated("true");
    }
    else {
      setEditComplated("false");
    }
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <input type="text" className="form-control" placeholder="Enter Name"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input type="text" className="form-control" placeholder="Enter Description"
              value={description} onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col>
            <input type="checkbox"
              checked={complated === "true" ? true : false} onChange={(e) => handleComplatedChange(e)} value={complated}
            />
            <label>Complated</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Complated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.length > 0 ?
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.complated}</td>
                    <td colSpan={2}>
                      <button className="btn btn-primary" onClick={() => handleEdit(item._id)}>Edit</button> &nbsp;
                      <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
              :
              console.log("Loading...")
          }
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input type="text" className="form-control" placeholder="Enter Name"
                value={editName} onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input type="text" className="form-control" placeholder="Enter Description"
                value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
              />
            </Col>
            <Col>
              <input type="checkbox"
                checked={editComplated === "true" ? true : false} onChange={(e) => handleEditComplatedChange(e)} value={editComplated}
              />
              <label>Complated</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

export default App;