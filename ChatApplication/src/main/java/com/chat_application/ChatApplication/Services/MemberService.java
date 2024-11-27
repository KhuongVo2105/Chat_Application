package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Request.MemberAddReq;
import com.chat_application.ChatApplication.Dto.Request.MemberUpdateReq;
import com.chat_application.ChatApplication.Entities.Group;
import com.chat_application.ChatApplication.Entities.Member;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
import com.chat_application.ChatApplication.Repositories.GroupRepository;
import com.chat_application.ChatApplication.Repositories.MemberRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MemberService {

    MemberRepository memberRepository;
    GroupRepository groupRepository;
    UserRepository userRepository;

    public Member add(MemberAddReq req) {
        Group group = groupRepository.findById(req.getGroupId())
                .orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED));
        User user = userRepository.findById(UUID.fromString(req.getUserId()))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return memberRepository.save(
                Member.builder()
                        .createdAt(Timestamp.from(Instant.now()))
                        .group(group)
                        .user(user)
                        .isLeader(req.getIsLeader())
                        .build()
        );
    }

    public Member getMemberByUserIdAndGroupId(String userId, int groupId) {
        return memberRepository.findByUser_IdAndGroup_Id(UUID.fromString(userId), groupId)
                .orElseThrow(() -> new AppException(ErrorCode.MEMBER_NOT_EXISTED));
    }

    public Member update(MemberUpdateReq req) {
        Member member = getMemberByUserIdAndGroupId(req.getUserId(), req.getGroupId());
        member.setLeader(req.getIsLeader());
        return memberRepository.save(member);
    }

    public void remove(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
        memberRepository.delete(member);
    }
}
