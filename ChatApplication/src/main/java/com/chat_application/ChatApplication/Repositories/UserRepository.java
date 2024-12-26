package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
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

    @Query("select u from User u where u.username like %?1% and u.status = 1 and u.privacy = false")
    List<User> searchByUsername(String username);
}
