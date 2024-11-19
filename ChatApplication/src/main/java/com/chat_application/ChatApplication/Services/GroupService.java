package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Entities.Group;
import com.chat_application.ChatApplication.Repositories.GroupRepository;
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@Slf4j
@Data
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GroupService {

    GroupRepository groupRepository;

    // Tạo group mới
    public Group create() {
        return groupRepository.save(
                Group.builder()
                        .createdAt(new Timestamp(System.currentTimeMillis()))
                        .build()
        );
    }

    // Lấy danh sách tất cả các group
    public List<Group> getAll() {
        return groupRepository.findAll();
    }

    // Lấy thông tin chi tiết của một group
    public Group getById(int id) {
        return groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Group not found with id: " + id));
    }

    // Xóa group chỉ khi không còn leader
    public void delete(int id) {
        groupRepository.deleteById(id);
    }
}
