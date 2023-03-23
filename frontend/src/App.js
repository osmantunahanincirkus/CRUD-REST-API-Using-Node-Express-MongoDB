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
  const [isComplated, setIsComplated] = useState(0)

  const [editID, setEditId] = useState('');
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editIsComplated, setEditIsComplated] = useState(0)

  const todos = [
    {
      _id: '63fe0894da85463f8f5b7980',
      name: 'todo 14',
      description: 'test test test test açıklama',
      isComplated: 'false'
    },
    {
      _id: '63fe0894da85463f8f5b7981',
      name: 'todo 15',
      description: 'test test test test açıklama',
      isComplated: 'true'
    },
    {
      _id: '63fe0894da85463f8f5b7982',
      name: 'todo 16',
      description: 'test test test test açıklama',
      isComplated: 'false'
    }
  ]

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

  const handleEdit = (_id) => {
    handleShow();
    axios.get(`http://localhost:5000/api/todo/${_id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditDescription(result.data.description);
        setEditIsComplated(result.data.isComplated);
        setEditId(_id);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleDelete = (_id) => {
    if (window.confirm("Are you sure to delete this todo?") === true) {
      axios.delete(`http://localhost:5000/api/todo/${_id}`)
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

  const handleUpdate = () => {
    const url = `http://localhost:5000/api/todo/${editID}`;
    const data = {
      "_id": editID,
      "name": editName,
      "description": editDescription,
      "isComplated": editIsComplated
    }

    axios.put(url, data)
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

  const handleSave = () => {
    const url = 'http://localhost:5000/api/todo';
    const data = {
      "name": name,
      "description": description,
      "isComplated": isComplated
    }

    axios.post(url, data)
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
    setIsComplated('');
    setEditName('');
    setEditDescription('');
    setEditIsComplated(0);
    setEditId('');
  }

  const handleComplatedChange = (e) => {
    if (e.target.checked) {
      setIsComplated("true");
    }
    else {
      setIsComplated("false");
    }
  }

  const handleEditComplatedChange = (e) => {
    if (e.target.checked) {
      setEditIsComplated("true");
    }
    else {
      setEditIsComplated("false");
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
              checked={isComplated === 'true' ? true : false} onChange={(e) => handleComplatedChange(e)} value={isComplated}
            />
            <label>IsComplated</label>
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
            <th>IsComplated</th>
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
                    <td>{item.isComplated}</td>
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
                checked={editIsComplated === 'true' ? true : false} onChange={(e) => handleEditComplatedChange(e)} value={editIsComplated}
              />
              <label>IsComplated</label>
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