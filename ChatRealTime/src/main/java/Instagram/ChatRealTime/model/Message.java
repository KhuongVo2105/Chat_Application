package Instagram.ChatRealTime.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "Messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private boolean visible; // true là trạng thái bị block con false là trang thái bình thường
    private String content;
    private Timestamp createdAt;
    @NonNull
    private UUID userIdSend;

    private UUID userIdTo; // chứa id người nhận để nhắn riêng

    private int groupChatId; // chứa id nhóm chat

    public int getGroupChatId() {
        return groupChatId;
    }

    public void setGroupChatId(int groupChatId) {
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public UUID getUserIdTo() {
        return userIdTo;
    }

    public void setUserIdTo(UUID userIdTo) {
        this.userIdTo = userIdTo;
    }
}
