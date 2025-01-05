package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {
Optional<Group> findById(int groupId);

}
