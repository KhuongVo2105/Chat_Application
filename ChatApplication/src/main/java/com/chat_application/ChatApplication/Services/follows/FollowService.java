package com.chat_application.ChatApplication.Services.follows;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Follow;
import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Repositories.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowService implements IFollowService{
    @Autowired
    private FollowRepository dao;

    @Override
    public ApiResponse<List<Follow>> getFollowByUserId(User followerUser) {
        List<Follow> follows = dao.findAllByFollowerUser(followerUser);
        if(!follows.isEmpty()){
            return ApiResponse.<List<Follow>>builder()
                    .message("Get list follow successfully")
                    .result(follows)
                    .build();
        }
        return ApiResponse.<List<Follow>>builder()
                .message("Get list follow failed")
                .result(null)
                .build();
    }

    @Override
    public ApiResponse<Follow> add(Follow follow) {
        dao.save(follow);
        return ApiResponse.<Follow>builder()
                .message("Add follow successfully")
                .result(follow)
                .build();
    }
}
