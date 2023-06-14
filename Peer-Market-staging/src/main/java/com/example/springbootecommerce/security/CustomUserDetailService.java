package com.example.springbootecommerce.security;

import com.example.springbootecommerce.pojo.entity.User;
import com.example.springbootecommerce.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmailAndIsActive(email,true);
        if (user == null) {
            throw new UsernameNotFoundException("Email not found: " + email);
        }
        return new CustomUserDetails(user);
    }
}
