package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
Optional<Member> findById(int id);
Optional<Member> findByUser_IdAndGroup_Id(UUID userId, int groupId);

Optional<List<Member>> findAllByGroup_Id(int groupId);
}
