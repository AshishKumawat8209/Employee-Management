import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const[employee, setEmployee] = useState({
        id:id,
        name:"",
        email:"",
        phone:""
    })
    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({...employee, [e.target.name]:value })
    }
    const reset = (e) => {
        e.preventDefault();
        setEmployee({
            id:"",
            name:"",
            email:"",
            phone:""
        })
    }
    useEffect( ()=>{
        const fetchData = async ()=>{
            try{
                const response = await EmployeeService.getEmployeeById(employee.id);
                console.log(response);
                setEmployee(response.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, []);
    const updateEmployee = (e) => {
        e.preventDefault();
        EmployeeService.updateEmployee(employee,id)
        .then((result) => {
            console.log("saved", result);
            navigate("/")
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <div className="bg-purple-900 max-w-xl container mx-96 my-24 py-2 px-8 font-semibold shadow rounded">
            <div className='text-2xl tracking-wide font-bold py-2 px-10 text-center ml-auto flex'>
                <p>Update Employee</p>
                <button 
                onClick={() => navigate('/')}
                className='ml-auto hover:bg-white text-right'>❌</button>
            </div>
            <div className='mx-10 my-2'>

                <input 
                onChange={(e) => handleChange(e)}
                value={employee.name}
                name="name" className="w-full py-2 my-2 px-4 rounded text-purple-950" type='text' placeholder='Enter Name'/>

                <input 
                onChange={(e) => handleChange(e)}
                value={employee.email}
                name="email" className="w-full py-2 my-2 px-4 rounded text-purple-950" type='email' placeholder='Enter Email'/>

                <input 
                onChange={(e) => handleChange(e)}
                value={employee.phone}
                name="phone" className="w-full py-2 my-2 px-4 rounded text-purple-950 " type='number' placeholder='Enter Mobile No'/>
            </div>
            <div className='mx-10 my-2 flex justify-between font-semibold'>
                <button 
                onClick={updateEmployee}
                className='hover:bg-white hover:cursor-pointer px-2 py-1 hover:text-purple-950 '>Update</button>
                <button 
                onClick={reset}
                className='hover:bg-white hover:cursor-pointer px-2 py-1 hover:text-purple-950 '>Clear</button>
            </div>
        </div>
    )
}

export default UpdateEmployee
