package Instagram.ChatRealTime.Dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupChatRequest {
    private String nameGroup;
    private List<String> idUserList;

    public String getNameGroup() {
        return nameGroup;
    }

    public void setNameGroup(String nameGroup) {
        this.nameGroup = nameGroup;
    }

    public List<String> getIdUserList() {
        return idUserList;
    }

    public void setIdUserList(List<String> idUserList) {
        this.idUserList = idUserList;
    }
}
