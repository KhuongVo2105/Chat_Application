//package com.chat_application.ChatApplication.chat;
//
//import com.chat_application.ChatApplication.Entities.Message;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.context.event.EventListener;
//import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionDisconnectEvent;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class WebSocketEventListener {
//    private final SimpMessageSendingOperations messagingTemplate;
//
//    @EventListener
//    public void handleWebSocketConnectListener(SessionDisconnectEvent event) {
//        log.info("Received a new web socket connection");
//    }
//
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//        String username = (String) headerAccessor.getSessionAttributes().get("username");
//        if(username != null) {
//            log.info("User Disconnected : " + username);
//            var chatMessage = Message.builder()
//                    .senderId(username)
//                    .type(MessageType.LEAVE)
//                    .build();
//            messagingTemplate.convertAndSend( "/topic/public", chatMessage);
//        }
//    }
//}
