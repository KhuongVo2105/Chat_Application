package com.chat_application.ChatApplication.Configuration;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class JavaMailSenderConfig {

    @NonFinal
    @Value("${spring.mail.host}")
    String HOSTNAME;

    @NonFinal
    @Value("${spring.mail.username}")
    String USERNAME;

    @NonFinal
    @Value("${spring.mail.password}")
    String PASSWORD;

    @NonFinal
    @Value("${spring.mail.port}")
    int PORT;

    @NonFinal
    @Value("${spring.mail.properties.mail.smtp.auth}")
    boolean AUTH;

    @NonFinal
    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    boolean ENABLE;

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(HOSTNAME);
        mailSender.setPort(PORT);

        mailSender.setUsername(USERNAME);
        mailSender.setPassword(PASSWORD);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", AUTH);
        props.put("mail.smtp.starttls.enable", ENABLE);
        props.put("mail.debug", "true");

        return mailSender;
    }

}
