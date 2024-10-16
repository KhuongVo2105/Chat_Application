package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Token;
import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(int token);

    Optional<Token> findByEmail(String email);
}