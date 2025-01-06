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
    int id;
    boolean visible; // true là trạng thái bị block con false là trang thái bình thường
    String content;
    Timestamp createdAt;
    @NonNull
    UUID userIdSend;

    @Column(nullable = true)
    UUID userIdTo; // chứa id người nhận để nhắn riêng

    Long groupChatId; // chứa id nhóm chat
}
