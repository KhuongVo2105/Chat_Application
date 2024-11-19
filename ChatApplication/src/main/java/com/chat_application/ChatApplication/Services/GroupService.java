package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Response.GroupResponse;
import com.chat_application.ChatApplication.Entities.Group;
import com.chat_application.ChatApplication.Entities.Member;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
import com.chat_application.ChatApplication.Repositories.GroupRepository;
import com.chat_application.ChatApplication.Repositories.MemberRepository;
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
    MemberRepository memberRepository;

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
    public GroupResponse getById(int id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED));

        // Lấy danh sách các Member liên quan đến group thông qua groupId
        List<Member> members = memberRepository.findAllByGroup_Id(id)
                .orElseThrow(() -> new AppException(ErrorCode.GROUP_HAS_NO_MEMBERS));

        // Lấy danh sách userId từ danh sách các Member
        List<String> userIds = members.stream()
                .map(member -> member.getUser().getId().toString()) // Chuyển UUID của User sang String
                .toList();

        // Tạo và trả về GroupResponse
        return GroupResponse.builder()
                .group(group)
                .userIds(userIds)
                .build();
    }

    // Xóa group chỉ khi không còn leader
    public void delete(int id) {
        groupRepository.deleteById(id);
    }
}
