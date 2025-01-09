
# Instagram Clone - Mobile App & Admin Web Management

[![Thumbnail](https://github.com/user-attachments/assets/996c70bd-5b8b-462a-b5f2-b75375a6600e)](https://www.youtube.com/watch?v=-cP4y8AChzs)


This project is a mobile application cloned from Instagram, accompanied by a web-based admin management system. It was developed as a course project for the "Mobile Device Programming Practice" course by a team of 5 members over a period of 3+ months.

**This project is for educational purposes only. Commercial use is strictly prohibited.**

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend (Spring Boot)](#backend-spring-boot)
  - [Mobile App (React Native)](#mobile-app-react-native)
  - [Admin Web (React JS)](#admin-web-react-js)
- [Demo Video](#demo-video)
- [Project Status](#project-status)
- [Team Members](#team-members)
- [License](#license)

## Features

**Mobile App (React Native):**

- User Authentication (Sign Up/Login/Logout)
- Post Creation (Image/Video/Audio)
- Real-time Messaging (WebSocket-based, including group chats)
- User Profile Management (Edit profile, update avatar)
- User Search
- Follow/Unfollow Functionality
- Push Notifications (New followers, Spring Mail)
- Sharing Account via QR Code

**Admin Web (React JS):**

- User Management (View, Lock/Unlock Accounts)
- Post Management
- Message Statistics
- Report Management (Review and approve user reports)

## Technologies

- **Mobile App:** React Native (CLI), Nativewind, React Native Paper
- **Web Admin:** React JS
- **Backend:** Spring Boot (Two separate servers), MySQL
- **Image/Avatar Storage:** Firebase
- **Media Storage (Posts):** Cloudinary
- **Security:** JWT, Spring Security
- **Real-time Communication:** WebSocket
- **Other:** Spring Mail

## Project Structure
```php
ChatApplication
├── admin
├── ChatApplication
├── ChatRealTime
├── InstagramClone
├── Prototypes
└── README.md
```

**Detailed Explanation:** 
- **admin/**: This directory contains the ReactJS project for the admin web application. 
- **ChatApplication/**: This directory houses the Spring Boot server responsible for handling data API requests, user authentication, and other core functionalities. 
- **ChatRealTime/**: This directory contains the Spring Boot server dedicated to WebSocket communication for real-time chat. 
- **Instagram/**: This directory contains the React Native project for the mobile application. 
- **Prototypes/**: This directory contains initial design prototypes and documentation (may not be fully up-to-date). 
## Getting Started 
**Prerequisites:** 
- Node.js and npm/yarn 
- Java Development Kit (JDK) 
- MySQL Server 
- Android Studio/Xcode (for mobile development) 
- Visual Studio Code (Recommended for mobile development and debugging) 
- IntelliJ IDEA (Recommended for backend development) 
- React Native Debugger (Recommended for debugging React Native apps)
### Backend (Spring Boot) 
**Backend API Server (ChatApplication):**
1. Navigate to the `ChatApplication` directory: `cd ChatApplication` 
2. Run the Spring Boot application: `mvn spring-boot:run`
3. ![ChatApplication Run](https://github.com/user-attachments/assets/190719cf-31fb-46e5-90b2-9cac5ee9f9f3)

**Real-time Chat Server (ChatRealTime):**
1. Navigate to the `ChatRealTime` directory: `cd ChatRealTime`
2. Run the Spring Boot application: `mvn spring-boot:run` ![ChatRealTime Run](https://github.com/user-attachments/assets/cc7e9911-1588-4761-a333-e488a23bee73)

**Note:** The `ChatApplication` server runs on port 8080 (context `/chat-application`), and the `ChatRealTime` server runs on port 8800 (context `/`). Both servers connect to the same MySQL database. 
### Mobile App (React Native) 
1. Navigate to the `Instagram` directory: `cd Instagram` 
2. Install dependencies: `npm install` or `yarn install` 
3. Start the Metro Bundler: `npx react-native start` ![React Native Start](https://github.com/user-attachments/assets/47c49497-f99d-4526-94ae-c70acd332281)
4. Run the app on an Android emulator/device: `npx react-native run-android` or for iOS: `npx react-native run-ios`
### Admin Web (React JS) 
1. Navigate to the `admin` directory: `cd admin` 
2. Install dependencies: `npm install` or `yarn install` 
3. Start the development server: `npm start` or `yarn start` ![Admin Start](https://github.com/user-attachments/assets/08722670-ef92-484e-b3bf-e7e27435ba84)

## Demo Video 
[My youtube demo](https://www.youtube.com/watch?v=-cP4y8AChzs)
## Project Status
This project was developed for academic purposes and is now considered complete. No further development is planned. 
## Team Members 
* [Khương Võ](https://github.com/KhuongVo2105)
* [NguyenNgocQuy](https://github.com/nguyenngocquy21130506) 
* [CaoThanhNammm](https://github.com/CaoThanhNammm) 
* [Nguyễn Toàn Phước](https://github.com/21130484) 
* [Nguyễn Trọng Nghĩa](https://github.com/NTN77)
## License
This project is open-source and available for educational purposes. Commercial use is strictly prohibited.

