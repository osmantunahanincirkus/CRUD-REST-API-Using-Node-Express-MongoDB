import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TodoApi} from '../api/todo.api';
import {Container, Button, Modal, Form, Row, Card, CardGroup, DropdownButton, Dropdown} from 'react-bootstrap';

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
        if (!todoCreateObject.name) {
            alert('Todos name cannot be empty !');
            return;
          }
          if (!todoCreateObject.description) {
            alert('Todos description cannot be empty !');
            return;
          }

        const {error} = await TodoApi.create(todoCreateObject);
        if (error) {
            return toast.error(error);
        }
        toast.success('Todo has been added !');
        await rollbackToCreateObject();
        setTodoList((prevState) => [todoCreateObject, ...prevState]);
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
        if (!todoUpdateObject.title) {
            alert('Todos name cannot be empty !');
            return;
          }
          if (!todoUpdateObject.description) {
            alert('Todos description cannot be empty !');
            return;
          }
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
                <div className={'col-12 p-2'}>
                    <div className={'pb-3 mb-1 border-bottom border-1'}>
                        <Row className={'align-items-end'}>
                            <div className={'col-8'}>
                                <Row>
                                    <Form.Group className={'col-6'}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Todo's Name..." value={todoCreateObject.name} onChange={(e) => setTodoCreateObject({...todoCreateObject, name: e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group className={'col-6'}>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Todo's Description..." value={todoCreateObject.description} onChange={(e) => setTodoCreateObject({...todoCreateObject, description: e.target.value})}/>
                                    </Form.Group>
                                </Row>
                            </div>
                            <div className={'col-2'}>
                                <Form.Group>
                                    <Form.Check type="checkbox" label={todoCreateObject.complated ? 'Complated' : 'Not Complated'} checked={todoCreateObject.complated} onChange={(e) => setTodoCreateObject({...todoCreateObject, complated: e.target.checked})}/>
                                </Form.Group>
                            </div>
                            <div className={'col-2'}>
                                <Button variant={'primary'} className={'w-100'} onClick={() => handleSave()}>Submit</Button>
                            </div>
                        </Row>
                    </div>
                </div>

                <CardGroup>
                    {
                        todoList.map((todo, index)=>{
                            return (
                                <div className={'col-4 p-2'} key={index}>
                                    <Card border={todo.complated ? 'success' : ''} className={'border border-2'}>
                                        <Card.Header>
                                            <Row className={'align-items-center'}>
                                                <div className={'col-10'}>
                                                    <small className={'text-muted'}>{todo.name}</small>
                                                </div>
                                                <div className={'col-2'}>
                                                    <DropdownButton variant={''} title={''}>
                                                        <Dropdown.Item onClick={() => showTodoUpdateModal(index)}>Edit</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => showTodoDeleteModal(index)}>Delete</Dropdown.Item>
                                                    </DropdownButton>
                                                </div>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>{todo.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </CardGroup>
            </Container>

            <Modal show={todoUpdateModal} onHide={rollbackToUpdateObject}>
                <Modal.Header>
                    <Modal.Title>Modify / Update Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Form.Group className={'col-6 mb-3'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Todo's Name..." value={todoUpdateObject.body.name} onChange={(e) => setTodoUpdateObject({...todoUpdateObject, body: {...todoUpdateObject.body, name: e.target.value}})}/>
                        </Form.Group>
                        <Form.Group className={'col-6 mb-3'}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Todo's Description..." value={todoUpdateObject.body.description} onChange={(e) => setTodoUpdateObject({...todoUpdateObject, body: {...todoUpdateObject.body, description: e.target.value}})}/>
                        </Form.Group>
                        <Form.Group className={'col-12'}>
                            <Form.Check type="checkbox" label={todoUpdateObject.body.complated ? 'Complated' : 'Not Complated'} checked={todoUpdateObject.body.complated} onChange={(e) => setTodoUpdateObject({...todoUpdateObject, body: {...todoUpdateObject.body, complated: e.target.checked}})}/>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setTodoUpdateModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
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
                    <Button variant="secondary" onClick={() => setTodoDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}