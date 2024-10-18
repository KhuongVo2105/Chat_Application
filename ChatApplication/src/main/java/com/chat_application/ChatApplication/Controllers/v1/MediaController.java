package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Services.media.IMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/v1/media")
public class MediaController {
    @Autowired
    private IMediaService iMediaService;

    @GetMapping("/findAll")
    public ApiResponse<List<Media>> findAll() {
        System.out.println("call api");
        ApiResponse<List<Media>> response = iMediaService.findAll();
        return response;
    }

    @PostMapping("/add")
    public ApiResponse<List<Media>> add(@RequestBody List<Media> mediaList) {
        System.out.println(mediaList);
        ApiResponse<List<Media>> response = iMediaService.add(mediaList);
        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable int id) {
        ApiResponse<String> response = iMediaService.delete(id);
        return response;
    }
}
