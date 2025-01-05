package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.ReportPostRequest;
import com.chat_application.ChatApplication.Dto.Request.UsernameRequest;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.ReportPostResponse;
import com.chat_application.ChatApplication.Dto.Response.UserResponse;
import com.chat_application.ChatApplication.Entities.Follow;
import com.chat_application.ChatApplication.Entities.Report;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Services.ReportPostService;
import com.chat_application.ChatApplication.Services.follows.IFollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/reportPost")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportPostController {
    @Autowired
    private ReportPostService reportService;

    @PostMapping("/getReportPort")
    public List<ReportPostResponse> getReportPort(){
        return reportService.getReportPort();
    }

    @PostMapping("/sendReportPort")
    public boolean sendReportPort(@RequestBody ReportPostRequest req){
        return reportService.sendReportPort(req);
    }
}
