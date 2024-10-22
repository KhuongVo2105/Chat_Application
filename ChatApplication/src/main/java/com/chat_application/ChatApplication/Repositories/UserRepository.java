package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findById(UUID uuid);

    boolean existsById(UUID uuid);
    Optional<User> findByUsername(String username);

    List<User> findByStatusActive(boolean isOnline);
}
