package com.example.first_project;

import java.util.*;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServicesImplement implements EmployeeServices{

    @Autowired
    private EmployeeRepositary employeeRepositary;
    
    // List<Employee> list = new ArrayList<>();

    @Override
    public String createEmployee(Employee emp) {
        // list.add(emp);

        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(emp, employeeEntity);
        employeeRepositary.save(employeeEntity);
        return "Save Successfully!";
    }

    @Override
    public Employee readEmployeeById(Long id) {
        EmployeeEntity empEnt = employeeRepositary.getReferenceById(id);
        Employee emp = new Employee();
        BeanUtils.copyProperties(empEnt, emp);
        return emp;
    }

    @Override
    public List<Employee> readEmployee() {
        // return list;

        List<Employee> empList = new ArrayList<>();
        List<EmployeeEntity> empEntList = employeeRepositary.findAll();
        for(EmployeeEntity empEnt:empEntList){
            Employee emp = new Employee();

            emp.setName(empEnt.getName());
            emp.setEmail(empEnt.getEmail());
            emp.setId(empEnt.getId());
            emp.setPhone(empEnt.getPhone());

            empList.add(emp);
        }
        return empList;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        // for(Employee e:list){
        //     if(e.getId() == id){
        //         list.remove(e);
        //         return true;
        //     }
        // }
        // return false;

        EmployeeEntity employeeEntity = employeeRepositary.getReferenceById(id);
        employeeRepositary.delete(employeeEntity);
        return true;
    }

    @Override
    public String updateEmployee(Long id, Employee emp) {
        EmployeeEntity empEnt = employeeRepositary.getReferenceById(id);
        empEnt.setEmail(emp.getEmail());
        empEnt.setName(emp.getName());
        empEnt.setPhone(emp.getPhone());
        employeeRepositary.save(empEnt);
        return "Update Sucessfully!";
    }
    
}
