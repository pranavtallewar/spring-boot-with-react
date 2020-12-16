package com.restwithreact.rest.webservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoService {

	private static List<Todo> todos = new ArrayList<>();
	private static long idCounter = 0;
	static {
		todos.add(new Todo(++idCounter, "pranav", "Learn to dance", new Date(), false));
		todos.add(new Todo(++idCounter, "pranav", "Learn Microservices", new Date(), false));
		todos.add(new Todo(++idCounter, "pranav", "Learn React", new Date(), false));
	}

	public List<Todo> findAll() {
		return todos;
	}

	public Todo deleteById(long id) {
		Todo todo = findById(id);
		
		if(null == todo)
			return null;
		
		if(todos.remove(todo))
			return todo;
		
		return null;
	}

	public Todo findById(long id) {
		return todos.stream().filter(todo -> todo.getId() == id).findFirst().get();
	}

	
	public Todo save(Todo todo) {
		if(todo.getId() == -1) {
			todo.setId(++idCounter);
			todos.add(todo);
		} else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
}
