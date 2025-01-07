package Instagram.ChatRealTime.Repositories;

import Instagram.ChatRealTime.model.GroupChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupChatRepository extends JpaRepository<GroupChat, Long> {
    //Lấy group dựa vào id
    GroupChat findGroupChatById(Long id);
}
