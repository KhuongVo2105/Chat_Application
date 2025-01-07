package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Notification;
import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findAllByReceptUser(User user);
}
