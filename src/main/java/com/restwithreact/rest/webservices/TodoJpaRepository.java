package com.restwithreact.rest.webservices;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restwithreact.rest.webservices.todo.Todo;

@Repository
public interface TodoJpaRepository extends JpaRepository<Todo, Long> {
	
	List<Todo> findByUsername(String username);
	

}
