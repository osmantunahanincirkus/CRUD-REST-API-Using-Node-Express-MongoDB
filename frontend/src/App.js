import logo from './logo.svg';
import Home from './pages/Home'
import addTodo from './components/addTodo';
import Edit from './components/Edit';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

function App(){
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () =>{
            try  {
                const response = await axios.get(
                "http://localhost:5000"
                );
                setTodos(response.data);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchTodos();
        }, []);
    
    return(
        
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/create" element={<addTodo />} />
                    <Route path="/edit" element={<Edit />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;