package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.UserReq;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Request.UserCreateReq;
import com.chat_application.ChatApplication.Dto.Response.UserRes;
import com.chat_application.ChatApplication.Services.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/users")
public class UserController {
    UserService userService;

    @NonFinal
    Link updateLink = WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(this.getClass()).update("id", null)).withRel("Update user"),
            deleteLink = WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(this.getClass()).delete("id")).withRel("Delete user"),
            getLink = WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(this.getClass()).getUser("id")).withRel("Get user"),
            getAllLink = WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(this.getClass()).getUsers()).withRel("Get all user"),
            createLink = WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(this.getClass()).createUser(null)).withRel("Create user");

    @PostMapping
    ApiResponse<UserRes> createUser(@RequestBody @Valid UserCreateReq req) {

        HashMap<String, String> links = new HashMap<>();
        links.put("Update user", updateLink.getHref());
        links.put("Get user", getLink.getHref());
        links.put("Delete user", deleteLink.getHref());

        return ApiResponse.<UserRes>builder()
                .result(userService.createUser(req))
                .links(links)
                .build();
    }

    @GetMapping
    ApiResponse<List<UserRes>> getUsers() {

        HashMap<String, String> links = new HashMap<>();
        links.put("Update user", updateLink.getHref());
        links.put("Create user", createLink.getHref());
        links.put("Get user", getLink.getHref());
        links.put("Delete user", deleteLink.getHref());

        return ApiResponse.<List<UserRes>>builder()
                .result(userService.getAll())
                .links(links)
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<UserRes> getUser(@PathVariable String id) {

        HashMap<String, String> links = new HashMap<>();
        links.put("Update user", updateLink.getHref());
        links.put("Delete user", deleteLink.getHref());

        return ApiResponse.<UserRes>builder()
                .result(userService.get(id))
                .links(links)
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<UserRes> update(@PathVariable String id, @RequestBody UserReq request) {

        HashMap<String, String> links = new HashMap<>();
        links.put("Delete user", deleteLink.getHref());

        return ApiResponse.<UserRes>builder()
                .result(userService.update(id, request))
                .links(links)
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> delete(@PathVariable String id) {
        userService.delete(id);

        HashMap<String, String> links = new HashMap<>();
        links.put("Create user", createLink.getHref());

        return ApiResponse.<Void>builder()
                .message("'" + id + "' was deleted")
                .links(links)
                .build();
    }
}
