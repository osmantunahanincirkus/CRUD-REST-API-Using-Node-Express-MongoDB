import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TodoApi} from '../api/todo.api';

export const TodoComponent = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoCreateObject, setTodoCreateObject] = useState({
        name: '',
        description: '',
        complated: false
    });
    const [todoUpdateModal, setTodoUpdateModal] = useState(false);
    const [todoUpdateObject, setTodoUpdateObject] = useState({
        id: 0,
        body: {
            name: '',
            description: '',
            complated: false
        }
    });
    const [todoDeleteModal, setTodoDeleteModal] = useState(false);
    const [todoDeleteObject, setTodoDeleteObject] = useState({
        id: 0,
        name: ''
    });

    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        const {data, error} = await TodoApi.gets();
        if (error) {
            return toast.error(error);
        }
        setTodoList(data);
    }
    async function rollbackToCreateObject() {
        setTodoCreateObject({
            name: '',
            description: '',
            complated: false
        });
        await getTodos();
    }
    const handleSave = async () => {
        const {error} = await TodoApi.create(todoCreateObject);
        if (error) {
            return toast.error(error);
        }
        toast.success('Todo has been added !');
        await rollbackToCreateObject();
    }
    const showTodoUpdateModal = async (index) => {
        setTodoUpdateObject({
            id: todoList[index]._id,
            body: {
                name: todoList[index].name,
                description: todoList[index].description,
                complated: todoList[index].complated
            }
        });
        setTodoUpdateModal(true);
    }
    async function rollbackToUpdateObject() {
        setTodoUpdateObject({
            id: 0,
            body: {
                name: '',
                description: '',
                complated: false
            }
        });
        await getTodos();
        setTodoUpdateModal(false);
    }
    const handleUpdate = async () => {
        const {error} = await TodoApi.update(todoUpdateObject.id, todoUpdateObject.body);
        if (error) {
            return toast.error(error);
        }
        toast.success('Todo has been updated !');
        await rollbackToUpdateObject();
    }
    const showTodoDeleteModal = async (index) => {
        setTodoDeleteObject({
            id: todoList[index]._id,
            name: todoList[index].name,
        });
        setTodoDeleteModal(true);
    }
    async function rollbackToDeleteObject() {
        setTodoDeleteObject({
            id: 0,
            name: '',
        });
        await getTodos();
        setTodoDeleteModal(false);
    }
    const handleDelete = async () => {
        const {error} = await TodoApi.delete(todoDeleteObject.id);
        if (error) {
            return toast.error(error);
        }
        toast.success('Todo has been deleted !');
        await rollbackToDeleteObject();
    }

    return (
        <React.Fragment>
            <ToastContainer/>
            <Container>
                <Row>
                    <Col>
                        <input
                            type="text" className="form-control" placeholder="Enter Name"
                            value={todoCreateObject.name} onChange={(e) => setTodoCreateObject({...todoCreateObject, name: e.target.value})}
                        />
                    </Col>
                    <Col>
                        <input
                            type="text" className="form-control" placeholder="Enter Description"
                            value={todoCreateObject.description} onChange={(e) => setTodoCreateObject({...todoCreateObject, description: e.target.value})}
                        />
                    </Col>
                    <Col>
                        <input
                            type="checkbox" id="complated"
                            checked={todoCreateObject.complated}
                            onChange={(e) => setTodoCreateObject({...todoCreateObject, complated: e.target.checked})}
                        />
                        <label htmlFor="complated" style={{marginLeft: '5px'}}>{todoCreateObject.complated ? 'Complated' : 'Not Complated'}</label>
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
                    todoList && todoList.length > 0 ?
                        todoList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.complated === true ? "Complated" : "Not Complated"}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary" onClick={() => showTodoUpdateModal(index)}>Edit</button>
                                        &nbsp;
                                        <button className="btn btn-danger" onClick={() => showTodoDeleteModal(index)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        console.log("Loading...")
                }
                </tbody>
            </Table>

            <Modal show={todoUpdateModal} onHide={rollbackToUpdateObject}>
                <Modal.Header>
                    <Modal.Title>Modify / Update Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input
                                type="text" className="form-control" placeholder="Enter Name"
                                value={todoUpdateObject.body.name} onChange={(e) => setTodoUpdateObject({...todoUpdateObject, body: {...todoUpdateObject.body, name: e.target.value}})}
                            />
                        </Col>
                        <Col>
                            <input
                                type="text" className="form-control" placeholder="Enter Description"
                                value={todoUpdateObject.body.description} onChange={(e) => setTodoUpdateObject({...todoUpdateObject, body: {...todoUpdateObject.body, description: e.target.value}})}
                            />
                        </Col>
                        <Col>
                            <input
                                type="checkbox" id="complatedUpdate"
                                checked={todoUpdateObject.body.complated}
                                onChange={(e) => setTodoUpdateObject({...todoUpdateObject, body: {...todoUpdateObject.body, complated: e.target.checked}})}
                            />
                            <label htmlFor="complatedUpdate" style={{marginLeft: '5px'}}>{todoUpdateObject.body.complated ? 'Comlated' : 'Not Complated'}</label>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setTodoUpdateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={todoDeleteModal} onHide={rollbackToDeleteObject}>
                <Modal.Header>
                    <Modal.Title>Delete Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        Are you sure delete todo with this name `{todoDeleteObject.name}`
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setTodoDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}