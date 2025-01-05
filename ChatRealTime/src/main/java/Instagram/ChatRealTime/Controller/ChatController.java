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

//    @MessageMapping("/chat")
//    @SendTo("/topic/messages")
//    public ChatMessage sendMessage(@Payload ChatMessage message){
//        message.setTimestamp(new Date());
//        return message;
//    }
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public void sendMessage1(@Payload ChatMessage message){     //status true: nhóm false: 1vs1
        System.out.println(message.toString());
        Message message1 = new Message();
        message1.setUserIdSend(UUID.fromString(message.getUserIdSend()));
        if(message.isType()) {
            System.out.println("có zô group");
            message1.setGroupChatId(Long.valueOf(message.getUserIdTo()));
            message1.setUserIdTo(null);
        }else {
            message1.setUserIdTo(UUID.fromString(message.getUserIdTo()));
        }
        message1.setContent(message.getContent());
        message1.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        System.out.println("có lưu gr");
        messageService.saveMessage(message1);
//        //Giúp gưửi tin nhắn riêng
//        String destination = "/user/" + message.getReceiverId() + "/queue/messages";
//        messagingTemplate.convertAndSendToUser(String.valueOf(message.getReceiverId()), "/queue/messages", message);//Gửi tin nhắn cho người nhận
    }
//add user
//    public Message addUser(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
//        headerAccessor.getSessionAttributes().put("username", message.getSender());
//        return message;
//    }
}
