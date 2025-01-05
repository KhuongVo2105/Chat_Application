package Instagram.ChatRealTime.Repositories;

import Instagram.ChatRealTime.model.MemberGroup;
import Instagram.ChatRealTime.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MemberGroupRepository extends JpaRepository<MemberGroup, Long> {
    //Danh sách các idGroup người dùng có tham gia
    List<MemberGroup> findMemberGroupByUserId(UUID userId);
}
