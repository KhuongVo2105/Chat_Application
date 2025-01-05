package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
Optional<Role> findById(String name);

    Role findByName(String name);
}
