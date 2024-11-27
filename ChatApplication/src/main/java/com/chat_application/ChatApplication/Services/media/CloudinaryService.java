package com.chat_application.ChatApplication.Services.media;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.List;
import java.util.Map;

public class CloudinaryService {
    public static final String IMAGE_TYPE = "image";
    public static final String VIDEO_TYPE = "video";

    public Cloudinary cloudinary;
    public static CloudinaryService INSTANCE;

    public CloudinaryService() {
        Dotenv dotenv = Dotenv.load();
        cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));
        cloudinary.config.secure = true;

        Transformation transformation = new Transformation()
                .width(1000).crop("scale").chain()
                .quality("auto:best").chain()
                .fetchFormat("auto");

        cloudinary.url().transformation(transformation);
    }

    public static CloudinaryService getINSTANCE() {
        if (INSTANCE == null) return new CloudinaryService();
        return INSTANCE;
    }

    // phương thức tải một ảnh
    public ApiResponse<String> uploadImage() {

        return ApiResponse.<String>builder()
                .code(200)
                .message("Upload image successfully")
                .build();
    }

    // phương thức xóa một ảnh
    public ApiResponse<String> deleteImage(String imagePath) throws Exception {
        Map result = cloudinary.uploader().destroy(imagePath,
                ObjectUtils.asMap("resource_type", "image"));


        if (result.get("result").equals("not found")) {
            return ApiResponse.<String>builder()
                    .code(200)
                    .message("Image not found")
                    .build();
        }

        return ApiResponse.<String>builder()
                .code(200)
                .message("Delete image successfully")
                .build();
    }

    // phương thức đệ quy để xóa các ảnh của thư mục con
    private void deleteFolderContentsImage(String folderName) throws Exception {
        Map result = cloudinary.api().resources(ObjectUtils.asMap(
                "type", "upload",
                "prefix", folderName,
                "resource_type", IMAGE_TYPE,
                "max_results", 500
        ));

        List<Map> resources = (List<Map>) result.get("resources");
        for (Map resource : resources) {
            String publicId = (String) resource.get("public_id");
            // Xóa tệp
            Map a = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            System.out.println(a);
        }

        // Lấy danh sách các thư mục con
        Map foldersResult = cloudinary.api().subFolders(folderName, ObjectUtils.emptyMap());
        List<Map> folders = (List<Map>) foldersResult.get("folders");
        for (Map folder : folders) {
            System.out.println(folder);
            String subFolderName = (String) folder.get("path");
            // Đệ quy xóa thư mục con
            deleteFolderContentsImage(subFolderName);
            deleteFolderImage(subFolderName);
        }
    }

    // phương thức dùng để xóa thư mục chứa ảnh
    // Cảnh báo: khi chạy phương thức này toàn bộ ảnh trong thư mục và các thư mục con đều bị xóa
    public ApiResponse<String> deleteFolderImage(String folderName) {
        try {
            deleteFolderContentsImage(folderName);
            cloudinary.api().deleteFolder(folderName, ObjectUtils.emptyMap());
            return ApiResponse.<String>builder()
                    .code(200)
                    .message("Delete folder successfully")
                    .build();
        } catch (Exception e) {
            return ApiResponse.<String>builder()
                    .code(404)
                    .message("Folder not found")
                    .build();
        }
    }

    // phương thức đệ quy để xóa các video của thư mục con
    private void deleteFolderContentsVideo(String folderName) throws Exception {
        Map result = cloudinary.api().resources(ObjectUtils.asMap(
                "type", "upload",
                "prefix", folderName,
                "resource_type", VIDEO_TYPE,
                "max_results", 500
        ));

        List<Map> resources = (List<Map>) result.get("resources");
        for (Map resource : resources) {
            String publicId = (String) resource.get("public_id");
            // Xóa tệp
            Map a = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            System.out.println(a);
        }

        // Lấy danh sách các thư mục con
        Map foldersResult = cloudinary.api().subFolders(folderName, ObjectUtils.emptyMap());
        List<Map> folders = (List<Map>) foldersResult.get("folders");
        for (Map folder : folders) {
            System.out.println(folder);
            String subFolderName = (String) folder.get("path");
            // Đệ quy xóa thư mục con
            deleteFolderContentsVideo(subFolderName);
            deleteFolderVideo(subFolderName);
        }
    }

    // phương thức dùng để xóa folder chứa video
    // Cảnh báo: khi chạy phương thức này toàn bộ video trong thư mục và các thư mục con đều bị xóa
    public ApiResponse<String> deleteFolderVideo(String folderName) {
        try {
            deleteFolderContentsImage(folderName);
            cloudinary.api().deleteFolder(folderName, ObjectUtils.emptyMap());
            return ApiResponse.<String>builder()
                    .code(200)
                    .message("Delete folder successfully")
                    .build();
        } catch (Exception e) {
            return ApiResponse.<String>builder()
                    .code(404)
                    .message("Folder not found")
                    .build();
        }
    }
}
