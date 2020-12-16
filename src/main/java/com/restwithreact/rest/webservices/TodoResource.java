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
public class TodoResource {

	@Autowired
	private TodoService todoService;

	@GetMapping("/users/{username}/todos")
	public List<Todo> getAll(@PathVariable String username) {
		return todoService.findAll();
	}

	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodoById(@PathVariable String username, @PathVariable long id) {
		Todo deletedTodo = todoService.deleteById(id);
		if (null != deletedTodo)
			return ResponseEntity.noContent().build();

		return ResponseEntity.notFound().build();
	}

	@GetMapping("/users/{username}/todos/{id}")
	public Todo getTodoById(@PathVariable String username, @PathVariable long id) {
		return todoService.findById(id);
	}

	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Todo> createTodo(@PathVariable String username, @RequestBody Todo todo) {
		Todo createdTodo = todoService.save(todo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
	}

	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id,
			@RequestBody Todo todo) {
		Todo savedTodo = todoService.save(todo);
		return new ResponseEntity<Todo>(savedTodo, HttpStatus.OK);

	}
}
