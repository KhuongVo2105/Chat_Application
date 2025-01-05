package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportPostRepository extends JpaRepository<Report, Integer> {
}
