package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.MemberAddReq;
import com.chat_application.ChatApplication.Dto.Request.MemberGetReq;
import com.chat_application.ChatApplication.Dto.Request.MemberUpdateReq;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Member;
import com.chat_application.ChatApplication.Services.MemberService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/members")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MemberController {

    MemberService memberService;

    @PostMapping("/add")
    ApiResponse<Member> addMember(@RequestBody MemberAddReq memberAddReq) {
        return ApiResponse.<Member>builder()
                .result(memberService.add(memberAddReq))
                .build();
    }

    @PutMapping("/update")
    ApiResponse<Member> updateMember(@RequestBody MemberUpdateReq memberUpdateReq) {
        return ApiResponse.<Member>builder()
                .result(memberService.update(memberUpdateReq))
                .build();
    }

    @GetMapping()
    ApiResponse<Member> getMember(@RequestBody MemberGetReq memberGetReq) {
        return ApiResponse.<Member>builder()
                .result(memberService
                        .getMemberByUserIdAndGroupId(
                                memberGetReq.getUserId(),
                                memberGetReq.getGroupId()
                        ))
                .build();
    }

    @DeleteMapping("/{memberId}")
    ApiResponse<Void> removeMember(@PathVariable int memberId) {
        memberService.remove(memberId);
        return ApiResponse.<Void>builder()
                .message("Member '" + memberId + "' was removed")
                .build();
    }
}
