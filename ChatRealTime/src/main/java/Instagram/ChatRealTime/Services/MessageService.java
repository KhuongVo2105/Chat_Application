package Instagram.ChatRealTime.Services;

import Instagram.ChatRealTime.Dto.Request.MessegeRequest;
import Instagram.ChatRealTime.Repositories.MessageRepository;
import Instagram.ChatRealTime.model.Message;
import Instagram.ChatRealTime.model.User;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final GroupChatService groupChatService;

    public MessageService(MessageRepository messageRepository, GroupChatService groupChatService) {
        this.messageRepository = messageRepository;
        this.groupChatService = groupChatService;
    }

    //    Lấy tin nhắn cũ
    public List<Message> getMessageHistory(UUID userIdSend, UUID userIdTo){
        return messageRepository.findMessagesBetweenUsers(userIdSend,userIdTo);
    }
    //Lưu tin nhắn
    public Message saveMessage(Message message){
        return messageRepository.save(message);
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
            boolean status = false;

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
            Timestamp timeCreateAt = lastMessage.getCreatedAt();
            int type = 0;
            result.add(new MessegeRequest(
                    String.valueOf(item.getId()),
                    lastMessage.getContent(),
                    item.getUsername(),
                    item.getAvatar(),
                    time,
                    visible,
                    status,
                    timeCreateAt
            ));

        }
        List<MessegeRequest> groupChatList = groupChatService.listGroup(userIdSend);
        if(groupChatList!=null){
            result.addAll(groupChatList);
            result.sort(Comparator.comparing(MessegeRequest::getTimeCreateAt).reversed());
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
