package Instagram.ChatRealTime.Services;

import Instagram.ChatRealTime.Repositories.UserRepository;
import Instagram.ChatRealTime.model.User;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUserById(UUID userId){
        return userRepository.findUserById(userId);
    }
}
