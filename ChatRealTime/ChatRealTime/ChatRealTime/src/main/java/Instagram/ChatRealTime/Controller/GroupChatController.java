package Instagram.ChatRealTime.Controller;

import Instagram.ChatRealTime.Dto.Request.MessageRecall;
import Instagram.ChatRealTime.Services.GroupChatService;
import Instagram.ChatRealTime.model.GroupChat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/GroupChat")
public class GroupChatController {
    private final GroupChatService groupChatService;

    public GroupChatController(GroupChatService groupChatService) {
        this.groupChatService = groupChatService;
    }

    @PostMapping("/createGroup")
    public ResponseEntity<String> createGroup(@RequestBody GroupChat group) {
        String nameGroup = group.getNameGroup(); // Nhận ID từ FE qua
        LocalDateTime time = LocalDateTime.now();
        Timestamp timestamp = Timestamp.valueOf(time);
        GroupChat groupChat = new GroupChat();
        groupChat.setNameGroup(nameGroup);
        groupChat.setCreateAt(timestamp);
        groupChat.setStatus(false);
        boolean success = groupChatService.createGroup(groupChat).isStatus();
        if (success) {
            return ResponseEntity.ok("Create Group Chat" + " recalled successfully.");
        } else {
            return ResponseEntity.status(404).body("Message not found or cannot be create group.");
        }
    }
}
