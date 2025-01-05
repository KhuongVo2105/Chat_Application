package Instagram.ChatRealTime.Repositories;

import Instagram.ChatRealTime.model.Message;
import Instagram.ChatRealTime.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    User findUserById(UUID idUser);
}
