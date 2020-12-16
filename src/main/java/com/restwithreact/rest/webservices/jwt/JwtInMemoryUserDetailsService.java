package com.restwithreact.rest.webservices.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

	static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

	static {
		inMemoryUserList.add(new JwtUserDetails(1L, "pranav",
				"$2a$10$lA.cuYZ6t2Pwj7V4TmbYl.rgcODg0WlQclih8I7UDNwJMII3Co.mq", "ROLE_USER_2"));
		inMemoryUserList.add(new JwtUserDetails(2L, "miten",
				"$2a$10$MhCfziAV51RuF8bpgiSwvOqu64MxK7Ij64zUqO94J3tDjbZQmn0qq", "ROLE_USER_2"));
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
				.filter(user -> user.getUsername().equals(username)).findFirst();

		if (!findFirst.isPresent()) {
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
		}

		return findFirst.get();
	}

}
