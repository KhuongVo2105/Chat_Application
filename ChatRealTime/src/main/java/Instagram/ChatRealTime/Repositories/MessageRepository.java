package Instagram.ChatRealTime.Repositories;

import Instagram.ChatRealTime.model.Message;
import Instagram.ChatRealTime.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    //Lấy tin nhắn giữa 2 user
    @Query("SELECT m FROM Message m WHERE (m.userIdSend = :userId1 AND m.userIdTo = :userId2) OR (m.userIdSend = :userId2 AND m.userIdTo = :userId1) ORDER BY m.createdAt ASC")
    List<Message> findMessagesBetweenUsers(@Param("userId1") UUID userId1, @Param("userId2") UUID userId2);

    //Lấy tin nhắn cuối cùng của 2user
    @Query("SELECT m FROM Message m WHERE (m.userIdSend = :userId1 AND m.userIdTo = :userId2) OR (m.userIdSend = :userId2 AND m.userIdTo = :userId1) ORDER BY m.createdAt DESC")
    List<Message> findLastMessagesBetweenUsers(@Param("userId1") UUID userId1, @Param("userId2") UUID userId2);

    //Lấy danh sách bạn bè co tương tác nhắn tin qua lại
    @Query("SELECT DISTINCT u FROM User u " +
            "WHERE u.id IN (" +
            "SELECT CASE " +
            "WHEN m.userIdSend = :userId THEN m.userIdTo " +
            "WHEN m.userIdTo = :userId THEN m.userIdSend " +
            "END " +
            "FROM Message m " +
            "WHERE m.userIdSend = :userId OR m.userIdTo = :userId)")
    List<User> findAllFriendsByUserId(@Param("userId") UUID userId);

    //Lay danh sach những người đã flows
    @Query("SELECT u FROM Follow f JOIN f.followingUser u WHERE f.followerUser.id = :userId")
    List<User> listFollowers(@Param("userId") UUID userId);

    //Thay đổi visible của tin nhắn
    @Modifying
    @Query("UPDATE Message m SET m.visible = true WHERE m.id = :messageId")
    int setVisibleMessage(@Param("messageId") int messageId);
    //Lấy tất cả tin nhắn từ Group từ cũ tới mới
    @Query("SELECT m FROM Message m WHERE m.groupChatId = :idGroup ORDER BY m.createdAt ASC")
    List<Message> findMessagesByGroupId(@Param("idGroup") String idGroup);
    //Lấy tất cả tin nhắn từ Group từ mới tới cũ
    @Query("SELECT m FROM Message m WHERE m.groupChatId = :idGroup ORDER BY m.createdAt DESC")
    List<Message> findLastMessagesByGroupId(@Param("idGroup") Long idGroup);
}
