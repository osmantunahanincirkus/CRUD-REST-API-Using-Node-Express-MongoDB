import React from 'react';
import {Button, Table} from 'react-bootstrap';
import Datas from './Datas';
import {Link,useNavigate} from 'react-router-dom'

function Home(){
    
    let history = useNavigate();

    const handleEdit = (_id, name, description) => {
        localStorage.setItem('Name',name);
        localStorage.setItem('Description',description);
        localStorage.setItem('Id',_id);
    }
    
    const handleDelete = (_id) => {
        var index = Datas.map(function(e){
            return e._id
        }).indexOf(_id);

        Datas.splice(index,1);

        history('/');
    }

    return(
        <React.Fragment>
            <div style={{margin:"10rem"}}>
                <Table striped bordered hover size="sm">
                    <thread>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thread>
                    <tbody>
                        {
                            Datas && Datas.length > 0
                            ?
                            Datas.map((item) =>{
                                return(
                                    <tr>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.description}
                                        </td>
                                        <td>
                                            <Link to={`/edit`}>
                                            <Button onClick={() => handleEdit(item._id, item.name, item.description)}>Edit</Button>
                                            </Link>
                                            &nbsp;
                                            <Button onClick={() => handleDelete(item._id)}>DELETE</Button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            "No data available"
                        }
                    </tbody>
                </Table>
                <br>
                </br>
                <Link className='d-grid gap-2' to="/create">
                    <Button size="lg">Create</Button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Home;