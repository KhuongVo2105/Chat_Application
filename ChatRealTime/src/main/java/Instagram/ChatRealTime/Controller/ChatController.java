package Instagram.ChatRealTime.Controller;

import Instagram.ChatRealTime.Dto.Request.MessageReponse;
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
//    @MessageMapping("/chat")
//    @SendTo("/topic/messages")
//    public void sendMessage(@Payload ChatMessage receivedMessage) {
//        System.out.println(receivedMessage.toString());
//        Message responseMessage = new Message();
//        responseMessage.setUserIdSend(UUID.fromString(receivedMessage.getUserIdSend()));
//
//        // Determine if the message is for a group or a one-on-one chat
//        if (receivedMessage.isType()) {
//            System.out.println("Group chat detected");
//            responseMessage.setGroupChatId(Long.valueOf(receivedMessage.getUserIdTo()));
//            responseMessage.setUserIdTo(null);
//        } else {
//            responseMessage.setUserIdTo(UUID.fromString(receivedMessage.getUserIdTo()));
//        }
//
//        responseMessage.setContent(receivedMessage.getContent());
//        responseMessage.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
//        responseMessage.setVisible(true);
//
//        // Save the message and handle success/failure
//        Message messResponse = messageService.saveMessage(responseMessage);
//        if (messResponse != null) {
//            // Notify clients about the new message
//            messagingTemplate.convertAndSend("/topic/messages", responseMessage);
//        } else {
//            // Handle failure case (optional)
//            System.out.println("Failed to save message");
//        }
//    }

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public void sendMessage(@Payload ChatMessage receivedMessage) {
        System.out.println(receivedMessage.toString());

        // Tạo đối tượng Message bằng builder
        Message responseMessage = Message.builder()
                .userIdSend(UUID.fromString(receivedMessage.getUserIdSend()))
                .content(receivedMessage.getContent())
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .visible(true)
                .build();

        // Determine if the message is for a group or a one-on-one chat
        if (receivedMessage.isType()) {
            System.out.println("Group chat detected");
            responseMessage.setGroupChatId(Long.valueOf(receivedMessage.getUserIdTo()));
            responseMessage.setUserIdTo(null);
        } else {
            responseMessage.setUserIdTo(UUID.fromString(receivedMessage.getUserIdTo()));
        }

        // Save the message and handle success/failure
        Message messResponse = messageService.saveMessage(responseMessage);
        if (messResponse != null) {
            // Tạo đối tượng MessageResponse để gửi về client
            MessageReponse messageResponse = MessageReponse.builder()
                    .id(responseMessage.getId())
                    .content(responseMessage.getContent())
                    .createdAt(responseMessage.getCreatedAt())
                    .userIdSend(responseMessage.getUserIdSend())
                    .groupChatId(responseMessage.getGroupChatId())
                    .visible(responseMessage.isVisible())
                    .build();

            // Notify clients about the new message
            messagingTemplate.convertAndSend("/topic/messages", messageResponse);
        } else {
            // Handle failure case (optional)
            System.out.println("Failed to save message");
        }
    }

    private String convertTime(){
        return "";
    }

}
