package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User,Long> {
    User findUserById(Long id);
    void deleteUserById(long id);
    Page<User> findAll(Pageable pageable);

    Page<User> getUsersByIsActive(Pageable pageable,boolean isActive);

    User getUserByEmailAndIsActive(String email,boolean isActive);
}
