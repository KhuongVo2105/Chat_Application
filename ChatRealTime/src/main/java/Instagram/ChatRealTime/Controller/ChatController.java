package Instagram.ChatRealTime.Controller;

import Instagram.ChatRealTime.Services.MessageService;
import Instagram.ChatRealTime.model.ChatMessage;
import Instagram.ChatRealTime.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Controller
public class ChatController {
    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;


    public ChatController(MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    // Nhan tin nhan va luu vao database
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public void sendMessage1(@Payload ChatMessage message) {
        System.out.println(message.toString());
        Message message1 = new Message();
        message1.setUserIdSend(UUID.fromString(message.getUserIdSend()));

        // Determine if the message is for a group or a one-on-one chat
        if (message.isType()) {
            System.out.println("Group chat detected");
            message1.setGroupChatId(Long.valueOf(message.getUserIdTo()));
            message1.setUserIdTo(null);
        } else {
            message1.setUserIdTo(UUID.fromString(message.getUserIdTo()));
        }

        message1.setContent(message.getContent());
        message1.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        message1.setVisible(true);

        // Save the message and handle success/failure
        Message messResponse = messageService.saveMessage(message1);
//        boolean isSaved = messageService.saveMessage(message1);
        if (messResponse != null) {
            // Notify clients about the new message
            messagingTemplate.convertAndSend("/topic/messages", message1);
        } else {
            // Handle failure case (optional)
            System.out.println("Failed to save message");
        }
    }

}
