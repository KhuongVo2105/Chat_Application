package com.chat_application.ChatApplication.Controllers.v1;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/redirect")
public class RedirectController {

    @GetMapping("/profile/{id}")
    public ResponseEntity<Map<String, String>> redirectToApp(@PathVariable String id) {
        String link = "https://myapp_instagram.com/profile/" + id;
        Map<String, String> response = new HashMap<>();
        response.put("link", link);
        return ResponseEntity.ok(response);
    }
}
