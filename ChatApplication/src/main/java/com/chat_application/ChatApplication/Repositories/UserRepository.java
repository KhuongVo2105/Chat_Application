package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findById(String uuid);

    boolean existsById(String uuid);
}
