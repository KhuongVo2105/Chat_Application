package Instagram.ChatRealTime.Dto.Request;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@NoArgsConstructor
public class MessageReponse {
    private boolean visible; // true là trạng thái bị block con false là trang thái bình thường
    private String content;
    private Timestamp createdAt;
    @NonNull
    private UUID userIdSend;
    private Long groupChatId; // chứa id nhóm chat
    private String avatar;

    public MessageReponse(boolean visible, String content, Timestamp createdAt, @NonNull UUID userIdSend, Long groupChatId, String avatar) {
        this.visible = visible;
        this.content = content;
        this.createdAt = createdAt;
        this.userIdSend = userIdSend;
        this.groupChatId = groupChatId;
        this.avatar = avatar;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Long getGroupChatId() {
        return groupChatId;
    }

    public void setGroupChatId(Long groupChatId) {
        this.groupChatId = groupChatId;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public UUID getUserIdSend() {
        return userIdSend;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUserIdSend(UUID userIdSend) {
        this.userIdSend = userIdSend;
    }

}

