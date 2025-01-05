package Instagram.ChatRealTime.Dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MessegeRequest {
    String userIdTo,lastMessage,name,avatar;
    String time;
    boolean visible,status;


    public MessegeRequest(String userIdTo, String lastMessage, String name, String avatar, String time, boolean visible, boolean status) {
        this.userIdTo = userIdTo;
        this.lastMessage = lastMessage;
        this.name = name;
        this.avatar = avatar;
        this.time = time;
        this.visible = visible;
        this.status = status;
    }

    public String getUserIdTo() {
        return userIdTo;
    }

    public void setUserIdTo(String userIdTo) {
        this.userIdTo = userIdTo;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }
}
