package Instagram.ChatRealTime.Dto.Request;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MessageReponse {
    int id;
    boolean visible; // true là trạng thái bị block con false là trang thái bình thường
    String content;
    Timestamp createdAt;
    @NonNull
    UUID userIdSend;
    Long groupChatId; // chứa id nhóm chat
    String avatar;

}

