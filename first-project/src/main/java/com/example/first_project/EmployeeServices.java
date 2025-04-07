package com.example.first_project;

import java.util.*;

import org.springframework.stereotype.Service;

@Service
public interface EmployeeServices {
    String createEmployee(Employee emp);
    List<Employee> readEmployee();
    boolean deleteEmployee(Long id);
    String updateEmployee(Long id, Employee employee);
    Employee readEmployeeById(Long id);
}
