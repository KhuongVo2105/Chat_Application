package com.chat_application.ChatApplication.WebSocket;

import lombok.extern.slf4j.Slf4j;
import org.cloudinary.json.JSONObject;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class SocketHandler extends TextWebSocketHandler {
    private List<WebSocketSession> sessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        printActiveConnections();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
//        // Truyền tin nhắn đến tất cả các session khác (trừ chính session gửi)
//        for (WebSocketSession webSocketSession : sessions) {
//            if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
//                webSocketSession.sendMessage(message);
//            }
//        }

        JSONObject jsonMessage = new JSONObject(message.getPayload());
        String type = jsonMessage.getString("type");

        if ("offer".equals(type) || "answer".equals(type) || "candidate".equals(type)) {
            // Chuyển tiếp các thông điệp signaling đến tất cả các client khác
            for (WebSocketSession webSocketSession : sessions) {
                if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                    webSocketSession.sendMessage(message);
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
    }

    private void printActiveConnections() {
        System.out.println("Active WebSocket Connections:");
        for (WebSocketSession session : sessions) {
            System.out.println("Session ID: " + session.getId() + ", URI: " + session.getUri());
        }
        System.out.println("Total Active Connections: " + sessions.size());
    }
}
