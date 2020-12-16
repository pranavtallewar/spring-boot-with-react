package com.restwithreact.rest.webservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RestWithReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestWithReactApplication.class, args);
	}

	@GetMapping
	public String helloWorld() {
		return "Hello World";
	}

	@GetMapping("/hello")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World");
	}

	@GetMapping("/hello/{name}")
	public HelloWorldBean helloWorldBeanWithParameter(@PathVariable String name) {
		// throw new RuntimeException("Something went wrong");
		return new HelloWorldBean(String.format("Hello %s", name));
	}
	@GetMapping("/basicauth")
	public AuthenticationBean authenticate() {
		// throw new RuntimeException("Something went wrong");
		return new AuthenticationBean("You are authenticated");
	}

}
