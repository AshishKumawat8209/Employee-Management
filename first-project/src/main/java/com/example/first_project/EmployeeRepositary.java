package com.example.first_project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EmployeeRepositary extends JpaRepository<EmployeeEntity, Long>{

}
