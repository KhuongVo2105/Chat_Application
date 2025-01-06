package Instagram.ChatRealTime.Services;

import Instagram.ChatRealTime.Dto.Request.MessegeRequest;
import Instagram.ChatRealTime.Repositories.MessageRepository;
import Instagram.ChatRealTime.model.Message;
import Instagram.ChatRealTime.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    //    Lấy tin nhắn cũ
    public List<Message> getMessageHistory(UUID userIdSend, UUID userIdTo){
        return messageRepository.findMessagesBetweenUsers(userIdSend,userIdTo);
    }
    //Lưu tin nhắn
    public void saveMessage(Message message){
        messageRepository.save(message);
    }
    //Lấy ra danh sách bạn bè và tin nhắn cuối cùng
    public List<MessegeRequest> ListFriendMessage(UUID userIdSend){
        List<User> userMessage = messageRepository.findAllFriendsByUserId(userIdSend); //Lấy danh sách của bạn bè nhắn tin của người dùng
        List<MessegeRequest> result = new ArrayList<>();
        for(User item : userMessage) {
            List<Message> messages = messageRepository.findLastMessagesBetweenUsers(userIdSend,item.getId());
            Message lastMessage = messages.get(0);
            System.out.println(lastMessage);
            boolean visible = false;
            boolean status = true;

            LocalDateTime currentTime = LocalDateTime.now();
            LocalDateTime createdAt = lastMessage.getCreatedAt().toLocalDateTime();

//            // Tính khoảng thời gian giữa hai thời điểm
            Duration duration = Duration.between(createdAt, currentTime);
//
//            // Lấy số ngày, giờ, phút, và giây
            long days = duration.toDays();
            long hours = duration.toHoursPart();
            long minutes = duration.toMinutesPart();
            long seconds = duration.toSecondsPart();
            String time = "";
            if(days > 0){
                time = days + " day";
            }else if(days == 0 && hours > 0){
                time = hours + " hours";
            }else if(days == 0 && hours == 0 && minutes > 0){
                time = minutes + " minutes";
            }else {
                time = "now";
            }

            if(lastMessage.getUserIdSend().equals(userIdSend)) visible = true;
            if(lastMessage.isVisible()) status = false;
            result.add(new MessegeRequest(
                    String.valueOf(item.getId()),
                    lastMessage.getContent(),
                    item.getUsername(),
                    item.getAvatar(),
                    time,
                    visible,
                    status
            ));
            System.out.println(result.toString());
        }
        return result;
    }
    public List<User> listFollowing(UUID userId){
        return messageRepository.listFollowers(userId);
    }

    //Thu hồi tn
    public boolean setVisibleMessage(int idMessage){
        if(messageRepository.setVisibleMessage(idMessage) > 0) return true;
        return false;
    }
}
