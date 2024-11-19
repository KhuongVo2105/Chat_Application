package com.chat_application.ChatApplication.Services.cloudinary;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Media;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICloudinaryService {
    ApiResponse<String> uploadMedia(MultipartFile file, String userId, int postId) throws IOException;

    ApiResponse<String> uploadMediaList(List<MultipartFile> listFile, String userId, int postId) throws IOException;

    ApiResponse<String> deleteMedia(String imagePath) throws Exception;

    ApiResponse<String> deleteFolderMedia(String folderName);
    ApiResponse<List<List<String>>> getAllMultipleMediaFromFolder(List<String> folders) throws Exception;

}
