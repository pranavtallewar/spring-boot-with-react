package com.restwithreact.rest.webservices;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptEncoderTest {

	public static void main(String[] args) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String password = encoder.encode("miten");
		System.out.println(password);
	}

}
