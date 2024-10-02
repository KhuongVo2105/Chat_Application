# Chat Application
A chat application inspired by Instagram's messaging feature, built with Spring Boot and MySQL. It includes real-time messaging, user authentication, and media sharing capabilities. #SpringBoot #MySQL #ChatApplication #RealTimeMessaging #Java #BackendDevelopment #InstagramClone #OpenSource
## Features
- Real-time messaging
- User authentication
- Media sharing (images, videos, etc.)
- Like and comment on posts
- Follow someone
- Create and share posts
- Voice and video calling
## Tech Stack
- Spring boot
- RESTful APIs
- MySQL
- Apache Maven
## Quy ước
### Đặt tên
- Tên hàm và phương thức, tên biến đặt theo chuẩn **camelCase**
- Tên class đặt theo chuẩn **PascalCase**
### Thiết lập quan hệ giữa các Entities
- **1-N**: Ở bảng **N**, luôn có *@ManyToOne* trỏ về bảng **1**.
	- Một người dùng (User) có nhiều bài viết (Post)
```php
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Post> posts = new HashSet<>();
}

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

```
- **N-N**: Sử dụng *@ManyToMany* ở cả hai bảng.
	-  Người dùng (User) có thể tham gia nhiều nhóm (Group), và mỗi nhóm có nhiều người dùng
```php
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_group",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private Set<Group> groups = new HashSet<>();
}

@Entity
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "groups")
    private Set<User> users = new HashSet<>();
}

```
- **1-1**: Sử dụng *@OneToOne* ở cả hai bảng, với thuộc tính *mappedBy* để chỉ ra phía nào giữ khóa ngoại (foreign key).
	- Một User có một địa chỉ (Address)
```php
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;
}

@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "address")
    private User user;
}
```
