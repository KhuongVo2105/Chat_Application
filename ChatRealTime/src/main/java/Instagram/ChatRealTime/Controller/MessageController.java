package Instagram.ChatRealTime.Controller;

import Instagram.ChatRealTime.Dto.Request.MessageRecall;
import Instagram.ChatRealTime.Dto.Request.MessegeRequest;
import Instagram.ChatRealTime.Services.MessageService;
import Instagram.ChatRealTime.model.Message;
import Instagram.ChatRealTime.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }
    @GetMapping("/history")
    public List<Message> getMessageHistory(@RequestParam String userIdSend, @RequestParam String userIdTo){
        UUID userIdS = UUID.fromString(userIdSend);
        UUID userIdT = UUID.fromString(userIdTo);
        return messageService.getMessageHistory(userIdS,userIdT);
    }
    //    // Lấy tin nhắn giữa hai người dùng
    @GetMapping("/{senderId}/{receiverId}")
    public ResponseEntity<?> getMessages(@PathVariable String senderId, @PathVariable String receiverId) {
        try {
            // Kiểm tra và chuyển đổi senderId, receiverId
            UUID senderUUID = UUID.fromString(senderId);
            UUID receiverUUID = UUID.fromString(receiverId);

            // Gọi service để lấy dữ liệu
            List<Message> messages = messageService.getMessageHistory(senderUUID, receiverUUID);

            return ResponseEntity.ok(messages);
        } catch (IllegalArgumentException e) {
            // Xử lý lỗi khi UUID không hợp lệ
            return ResponseEntity.badRequest().body("Invalid UUID format for senderId or receiverId");
        }
    }
//Lấy ra danh sách bạn bè có nhắn tin
    @GetMapping("/messageList")
    public List<MessegeRequest> listContactFriend(@RequestParam String userIdSend) {
        try {
            UUID userId = UUID.fromString(userIdSend);
            return messageService.ListFriendMessage(userId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid UUID format");
    }
}
    @GetMapping("/following")
    public List<User> listFollowing(@RequestParam String userId){
        try {
            UUID idUser = UUID.fromString(userId);
            return messageService.listFollowing(idUser);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid UUID format");
        }
    }
    //Hàm thu hồi
    @PostMapping("/recall")
    public ResponseEntity<String> recallMessage(@RequestBody MessageRecall message) {
        int messageId = message.getId(); // Nhận ID từ client
        // Xử lý logic thu hồi tin nhắn
        boolean success = messageService.setVisibleMessage(messageId); // Hàm xử lý thu hồi tin nhắn

        if (success) {
            return ResponseEntity.ok("Message " + messageId + " recalled successfully.");
        } else {
            return ResponseEntity.status(404).body("Message not found or cannot be recalled.");
        }
    }


}
