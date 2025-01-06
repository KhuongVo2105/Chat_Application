package Instagram.ChatRealTime.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Entity
@Table(name = "Follows")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @ManyToOne
    @JoinColumn(nullable = false)
    User followerUser;

    @ManyToOne
    @JoinColumn(nullable = false)
    User followingUser; // Người mà follower đang theo dõi

    Timestamp createdAt;
}
