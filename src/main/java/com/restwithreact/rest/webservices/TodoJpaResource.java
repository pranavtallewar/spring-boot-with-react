package com.restwithreact.rest.webservices;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.restwithreact.rest.webservices.todo.Todo;
import com.restwithreact.rest.webservices.todo.TodoService;

@RestController
public class TodoJpaResource {

	@Autowired
	private TodoService todoService;
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;
	
	
	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAll(@PathVariable String username) {
		return todoJpaRepository.findByUsername(username);
	}

	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodoById(@PathVariable String username, @PathVariable long id) {
		todoJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();

	}

	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getTodoById(@PathVariable String username, @PathVariable long id) {
		return todoJpaRepository.findById(id).get();
	}

	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Todo> createTodo(@PathVariable String username, @RequestBody Todo todo) {
		todo.setUsername(username);
		Todo createdTodo = todoJpaRepository.save(todo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
	}

	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id,
			@RequestBody Todo todo) {
		todo.setUsername(username);
		Todo savedTodo = todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(savedTodo, HttpStatus.OK);

	}
}
