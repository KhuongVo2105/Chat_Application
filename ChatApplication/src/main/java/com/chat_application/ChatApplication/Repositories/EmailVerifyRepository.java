package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.EmailVerify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailVerifyRepository extends JpaRepository<EmailVerify, String>{

    EmailVerify findByUserId(String userId);
}
