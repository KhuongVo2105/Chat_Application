package Instagram.ChatRealTime.Services;

import Instagram.ChatRealTime.Dto.Request.MessegeRequest;
import Instagram.ChatRealTime.Repositories.GroupChatRepository;
import Instagram.ChatRealTime.Repositories.MemberGroupRepository;
import Instagram.ChatRealTime.Repositories.MessageRepository;
import Instagram.ChatRealTime.model.GroupChat;
import Instagram.ChatRealTime.model.MemberGroup;
import Instagram.ChatRealTime.model.Message;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class GroupChatService {
    private final GroupChatRepository groupChatRepository;
    private final MemberGroupRepository memberGroupRepository;
    private final MessageRepository messageRepository;

    public GroupChatService(GroupChatRepository groupChatRepository, MemberGroupRepository memberGroupRepository, MessageRepository messageRepository) {
        this.groupChatRepository = groupChatRepository;
        this.memberGroupRepository = memberGroupRepository;
        this.messageRepository = messageRepository;
    }

    public GroupChat createGroup(GroupChat groupChat) {
        return groupChatRepository.save(groupChat);
    }

    public MemberGroup addMemberGr(MemberGroup memberGroup) {
        return memberGroupRepository.save(memberGroup);
    }

    //Lấy ra danh sách group và tin nhắn cuối cùng của group
    public List<MessegeRequest> listGroup(UUID userId) {
        List<MemberGroup> listGr = memberGroupRepository.findMemberGroupByUserId(userId); // danh sách các group người dùng tham gia
        if (listGr.isEmpty()) return null;
        List<MessegeRequest> result = new ArrayList<>();
        for (MemberGroup memberGroup : listGr) {
            GroupChat gr = groupChatRepository.findGroupChatById(memberGroup.getGroupChatId());
            if (gr != null) {
                List<Message> lastMessageGroup = messageRepository.findLastMessagesByGroupId(memberGroup.getGroupChatId());
                if (!lastMessageGroup.isEmpty()) {
                    Message lastMessage = lastMessageGroup.get(0);

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
                    String time = "";
                    if (days > 0) {
                        time = days + " day";
                    } else if (days == 0 && hours > 0) {
                        time = hours + " hours";
                    } else if (days == 0 && hours == 0 && minutes > 0) {
                        time = minutes + " minutes";
                    } else {
                        time = "now";
                    }
                    if (lastMessage.getUserIdSend().equals(userId)) visible = true;
                    Timestamp timeCreateAt = lastMessage.getCreatedAt();
                    result.add(new MessegeRequest(
                            String.valueOf(gr.getId()),
                            lastMessage.getContent(),
                            gr.getNameGroup(),
                            "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
                            time,
                            visible,
                            status,
                            lastMessage.getCreatedAt()));

                } else {
                    result.add(new MessegeRequest(
                            String.valueOf(gr.getId()),
                            "",
                            gr.getNameGroup(),
                            "",
                            "",
                            false,
                            true,
                            gr.getCreateAt()));
                }
            }
        }
        return result;
    }

    //    Lấy tin nhắn của group
    public List<Message> getMessageGroupHistory(String idGroup) {
        return messageRepository.findMessagesByGroupId(idGroup);
    }
}
