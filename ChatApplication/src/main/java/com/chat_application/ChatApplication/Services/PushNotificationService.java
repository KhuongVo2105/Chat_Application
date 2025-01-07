package com.chat_application.ChatApplication.Services;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PushNotificationService {
    String APP_ID = "672c61cb-8e38-40a0-9d50-d0cc76dc03fe";
    String REST_API_KEY = "NTA5NzEyMmUtMjYwNi00YzllLWI5MmQtNDA3Mzg0YmEwYWU4";
    String API_URL_PUSH_NOTIFICATION = "https://onesignal.com/api/v1/notifications";

    String API_CREATE_USER = "https://api.onesignal.com/apps/" + APP_ID + "/users";

    public boolean sendNotification(String title, String message, String[] userId) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + REST_API_KEY);
        headers.set("Content-Type", "application/json");

        Map<String, Object> payload = new HashMap<>();
        payload.put("app_id", APP_ID);
        payload.put("contents", Map.of("en", message));
        payload.put("headings", Map.of("en", title));
        payload.put("include_external_user_ids", userId);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                API_URL_PUSH_NOTIFICATION,
                HttpMethod.POST,
                request,
                String.class);

        return response.getStatusCode().is2xxSuccessful();
    }

    public boolean createUser(String userId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + REST_API_KEY);
        Map<String, Object> payload = new HashMap<>();
        Map<String, String> identity = new HashMap<>();
        identity.put("external_id", userId);
        payload.put("identity", identity);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                API_CREATE_USER,
                HttpMethod.POST,
                request,
                String.class
        );
        return response.getStatusCode().is2xxSuccessful();
    }

    public static void main(String[] args) {
        PushNotificationService pushNotificationService = new PushNotificationService();
        pushNotificationService.createUser("9836ce95-2337-4ce2-9f10-44ffba72eeada");
        pushNotificationService.createUser("0bda33fe-ad7c-4704-a265-c4d7bc3d9b6d");
        pushNotificationService.createUser("ab617869-530a-4512-b2ec-53f5b0809910");
        pushNotificationService.createUser("c5165bbe-842a-42e3-9609-14a3d0ad72e0");
        pushNotificationService.createUser("d88bf739-9063-4e2f-8279-ca7988ba7e66");
        pushNotificationService.createUser("e1d7dca0-be51-4efe-835b-f0ed3533f27c");
    }
}
