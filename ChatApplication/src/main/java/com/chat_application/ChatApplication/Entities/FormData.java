package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.Entity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FormData {
    private String uri;
    private String type;
    private String name;
}
