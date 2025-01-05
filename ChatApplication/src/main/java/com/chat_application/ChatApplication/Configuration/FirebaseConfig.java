package com.chat_application.ChatApplication.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        // Đảm bảo rằng đường dẫn đến google-services.json là chính xác
        FileInputStream serviceAccount =
            new FileInputStream("src/main/resources/firebase/webblog-6eee4-firebase-adminsdk-3ja5x-89dda28363.json");

        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .build();

        // Kiểm tra nếu FirebaseApp đã được khởi tạo
        if (FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.initializeApp(options); // Khởi tạo Firebase nếu chưa có
        } else {
            return FirebaseApp.getInstance(); // Trả về FirebaseApp nếu đã có
        }
    }
}
