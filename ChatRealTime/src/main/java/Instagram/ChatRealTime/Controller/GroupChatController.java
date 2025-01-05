package Instagram.ChatRealTime.Controller;

import Instagram.ChatRealTime.Dto.Request.GroupChatRequest;
import Instagram.ChatRealTime.Dto.Request.MessegeRequest;
import Instagram.ChatRealTime.Services.GroupChatService;
import Instagram.ChatRealTime.model.GroupChat;
import Instagram.ChatRealTime.model.MemberGroup;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/GroupChat")
public class GroupChatController {
    private final GroupChatService groupChatService;

    public GroupChatController(GroupChatService groupChatService) {
        this.groupChatService = groupChatService;
    }

    @PostMapping("/createGroup")
    public ResponseEntity<String> createGroup(@RequestBody GroupChatRequest group) {
        if (group.getNameGroup() == null || group.getNameGroup().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Group name cannot be empty.");
        }
        if (group.getIdUserList() == null || group.getIdUserList().isEmpty()) {
            return ResponseEntity.badRequest().body("Member list cannot be empty.");
        }
        String nameGroup = group.getNameGroup(); // Nhận tên từ FE qua
        List<String> memberList= group.getIdUserList(); //Nhận từ FE

        LocalDateTime time = LocalDateTime.now();
        Timestamp timestamp = Timestamp.valueOf(time);
        GroupChat groupChat = new GroupChat();
        groupChat.setNameGroup(nameGroup);
        groupChat.setCreateAt(timestamp);
        groupChat.setStatus(false);
        GroupChat gr;
        try {
            gr = groupChatService.createGroup(groupChat);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating group: " + e.getMessage());
        }
        boolean allMembersAdded = true;
        for (String idMember : memberList) {
            try {
                MemberGroup m = new MemberGroup();
                m.setGroupChatId(gr.getId());
                m.setUserId(UUID.fromString(idMember));
                groupChatService.addMemberGr(m);
            } catch (Exception e) {
                allMembersAdded = false;
                System.err.println("Error adding member " + idMember + ": " + e.getMessage());
            }
        }
        if (allMembersAdded) {
            return ResponseEntity.ok("Group chat created successfully with all members.");
        } else {
            return ResponseEntity.ok("Group chat created successfully, but some members could not be added.");
        }
    }
//    @GetMapping("/messageList")
//    public List<MessegeRequest> listContactFriend(@RequestParam String userIdSend) {
//        try {
//            UUID userId = UUID.fromString(userIdSend);
//            return groupChatService.listGroup(userId);
//        } catch (IllegalArgumentException e) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid UUID format");
//        }
//    }
}
