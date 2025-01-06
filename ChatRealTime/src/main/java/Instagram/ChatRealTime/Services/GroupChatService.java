package Instagram.ChatRealTime.Services;

import Instagram.ChatRealTime.Repositories.GroupChatRepository;
import Instagram.ChatRealTime.Repositories.MessageRepository;
import Instagram.ChatRealTime.model.GroupChat;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class GroupChatService {
    private final GroupChatRepository groupChatRepository;

    public GroupChatService(GroupChatRepository groupChatRepository) {
        this.groupChatRepository = groupChatRepository;
    }

    public GroupChat createGroup(GroupChat groupChat){
        return groupChatRepository.save(groupChat);
    }
}
