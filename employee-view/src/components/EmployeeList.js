import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

const EmployeeList = () => {
    const[loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    useEffect( ()=>{
        const fetchData = async ()=>{
            setLoading(true);
            try{
                const response = await EmployeeService.getEmployees();
                console.log(response);
                setEmployees(response.data);
            }catch(err){
                console.log(err);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    const deleteEmlpoyee = (e,id) => {
        e.preventDefault();
        EmployeeService.deleteEmployeeById(id)
        .then(() => {
            if(employees){
                setEmployees((prevElement) => {
                    return prevElement.filter((employee) => employee.id !== id);
                })
            }
        });
    }
    const updateEmlpoyee = (e,id) => {
        e.preventDefault();
        navigate(`/updateEmlpoyee/${id}`)
    };
    const navigate = useNavigate();
    return (
        <div className="container mx-52 my-10 justify-center;">
            <div>
                <button 
                onClick={() => navigate("/addEmployee")}
                className="bg-purple-900 hover:bg-white hover:text-purple-950 my-2 px-20 py-2 text-xl font-semibold rounded text-center">Add Employee</button>
            </div>
            <div>
                <table>
                    <thead className="shadow bg-purple-900 my-4 px-20 py-2 text-2xl font-serif">
                        <tr>
                            <th className="px-10 py-3 tracking-wide">Id</th>
                            <th className="px-10 py-3 tracking-wide">Name</th>
                            <th className="px-10 py-3 tracking-wide">Email</th>
                            <th className="px-10 py-3 tracking-wide">Mobile No</th>
                            <th className="px-10 py-3 tracking-wide">Action</th>
                        </tr>
                    </thead>
                    {!loading && employees.length >0 &&  (
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-white hover:text-purple-950">
                                    <td className="text-left px-6 py-4 whitespace-nowrap">{employee.id}</td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">{employee.phone}</td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <a 
                                        onClick={(e,id)=> updateEmlpoyee(e, employee.id)}
                                        className="hover:text-blue-500 hover:cursor-pointer px-2">Edit 📝</a>
                                        <a 
                                        onClick={(e,id)=> deleteEmlpoyee(e, employee.id)}
                                        className="hover:text-blue-500 hover:cursor-pointer px-2">Delete 🗑️</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;