package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.GroupResponse;
import com.chat_application.ChatApplication.Entities.Group;
import com.chat_application.ChatApplication.Services.GroupService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/groups")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GroupController {

    GroupService groupService;

    @PostMapping()
    ApiResponse<Group> create() {
        return ApiResponse.<Group>builder()
                .message("Group is created")
                .result(groupService.create())
                .build();
    }

    @GetMapping()
    ApiResponse<List<Group>> getGroups() {
        return ApiResponse.<List<Group>>builder()
                .result(groupService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<GroupResponse> getGroup(@PathVariable int id) {
        return ApiResponse.<GroupResponse>builder()
                .result(groupService.getById(id))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> delete(@PathVariable int id) {
        groupService.delete(id);
        return ApiResponse.<Void>builder()
                .message("'" + id + "' was deleted")
                .build();
    }
}
