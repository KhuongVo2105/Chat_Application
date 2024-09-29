package com.example.identity_service.repository;

import com.example.identity_service.entity.Token;
import com.example.identity_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(int token);

    Optional<Token> findByUser(User user);
}
