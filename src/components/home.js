import React from 'react';
import {Button, Table} from 'react-bootstrap';
import "bootstrap/dist/css/bootstap.min.css";
import datas from './datas';
import {Link,useNavigate} from 'react-router-dom'

function Home(){
    
    let history = useNavigate();

    const handleEdit = (id, name, description) => {
        localStorage.setItem('Name',name);
        localStorage.setItem('Description',description);
        localStorage.setItem('Id',id);
    }
    
    const handleDelete = (id) => {
        var index = datas.map(function(e){
            return e.id
        }).indexOf(id);

        datas.splice(index,1);

        history('/');
    }

    return(
        <Fragment>
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
                            datas && datas.length > 0
                            ?
                            datas.map((item) =>{
                                return(
                                    <tr>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.description}
                                        </td>
                                        <td>
                                            <Link to={'/edit'}>
                                            <Button onClick={() => handleEdit(item.id, item.name, item.description)}>Edit</Button>
                                            </Link>
                                            &nbsp;
                                            <Button onClick={() => handleDelete(item.id)}>DELETE</Button>
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
        </Fragment>
    )
}

export default Home;