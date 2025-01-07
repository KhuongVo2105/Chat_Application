package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Request.ReportPostRequest;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.ReportPostResponse;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.Report;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Repositories.PostRepository;
import com.chat_application.ChatApplication.Repositories.ReportPostRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import com.chat_application.ChatApplication.Services.post.IPostService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ReportPostService {
    PostRepository repository;
    ReportPostRepository reportPostRepository;
    UserRepository userRepository;

    public boolean sendReportPort(ReportPostRequest req) {
        Optional<Post> post = repository.findById(req.getPostId());
        User reporter = userRepository.findById(UUID.fromString(req.getReporterId())).orElse(null);
        try {
            if (post.isPresent() || reporter != null) {
                Report report = Report.builder()
                        .reporter(reporter)
                        .reportedPost(post.get())
                        .createdAt(Timestamp.from(Instant.now()))
                        .build();
                reportPostRepository.save(report);
                return true;
            } else {
                System.out.println("Post or reporter not found");
                throw new RuntimeException("Post or reporter not found");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<ReportPostResponse> getReportPort() {
        return reportPostRepository.findAll().stream()
                .filter(report -> report.getReportedPost() != null && report.getReportedPost().isVisible())
                .map(report -> {
            return ReportPostResponse.builder()
                    .id(report.getId())
                    .context(report.getContext())
                    .createdAt(report.getCreatedAt())
                    .reporterId(String.valueOf(report.getReporter().getId()))
                    .reporterUsername(String.valueOf(report.getReporter().getUsername()))
                    .reportedPostId(report.getReportedPost().getId())
                    .caption(report.getReportedPost().getCaption())
                    .build();
        }).toList();
    }
}