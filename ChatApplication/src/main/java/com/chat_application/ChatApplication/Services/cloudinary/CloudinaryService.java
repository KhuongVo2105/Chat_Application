package com.chat_application.ChatApplication.Services.cloudinary;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Media;
import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class CloudinaryService implements ICloudinaryService {
    public static final String IMAGE_TYPE = "image";
    public static final String VIDEO_TYPE = "video";
    public static final String FOLDER_POST = "posts";
    public static final String FOLDER_AVATAR = "avatars";

    public Cloudinary cloudinary;

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

    // phương thức tải một ảnh
    @Override
    public ApiResponse<String> uploadMedia(MultipartFile file, String userId, int postId) throws IOException {
        System.out.println("Thêm ảnh vào cloudinary");

        String type = file.getContentType();
        if (type.startsWith("video")) {
            type = "video";
        } else if (type.startsWith("image")) {
            type = "image";
        }

        Map params1 = ObjectUtils.asMap(
                "use_filename", true,   // Sử dụng tên file gốc
                "unique_filename", true, // Tạo tên tệp duy nhất
                "overwrite", false,   // Không ghi đè tệp cũ,
                "resource_type", type,
                "asset_folder", FOLDER_POST + "/" + userId + "/" + postId
        );

        try {
            Map uploadResultImage = cloudinary.uploader().upload(file.getBytes(), params1);
        } catch (Exception e) {
            File videoFile = convertMultiPartToFile(file);
            Map uploadResultVideo = cloudinary.uploader().upload(videoFile, params1);
            videoFile.deleteOnExit();
        }

        return ApiResponse.<String>builder()
                .code(200)
                .message("Upload image successfully")
                .build();
    }

    @Override
    public ApiResponse<String> uploadMediaList(List<MultipartFile> listFile, String userId, int postId) throws IOException {
        for (MultipartFile file : listFile) {
            uploadMedia(file, userId, postId);
        }
        return ApiResponse.<String>builder()
                .code(200)
                .message("Upload image successfully")
                .build();
    }


    // phương thức xóa một ảnh
    @Override
    public ApiResponse<String> deleteMedia(String imagePath) throws Exception {
        File imgFile = new File(imagePath);
        Map params2 = ObjectUtils.asMap(
                "quality_analysis", true
        );
        try {
            String publicId = (String) cloudinary.api().resource(imgFile.getName(), params2).get("public_id");
            Map a = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());

            return ApiResponse.<String>builder()
                    .code(200)
                    .message("Delete image successfully")
                    .build();
        } catch (Exception e) {
            return ApiResponse.<String>builder()
                    .code(200)
                    .message("Image not found")
                    .build();
        }
    }

    // phương thức đệ quy để xóa các ảnh và video của thư mục con
    private void deleteFolderContentsImage(String folderName) throws Exception {
        Map result = cloudinary.search()
                .expression("folder:" + folderName)
                .execute();

        List<Map> resources = (List<Map>) result.get("resources");
        System.out.println("resources: " + resources);

        for (Map resource : resources) {
            String publicId = (String) resource.get("public_id");
            String resourceType = (String) resource.get("resource_type");

            Map a = cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", resourceType));
            System.out.println("xóa:" + a);
        }

        // Lấy danh sách các thư mục con
        Map foldersResult = cloudinary.api().subFolders(folderName, ObjectUtils.emptyMap());
        List<Map> folders = (List<Map>) foldersResult.get("folders");
        for (Map folder : folders) {
            String subFolderName = (String) folder.get("path");
            // Đệ quy xóa thư mục con
            deleteFolderContentsImage(subFolderName);
            cloudinary.api().deleteFolder(subFolderName, ObjectUtils.emptyMap());
        }
    }

    // phương thức dùng để xóa thư mục
    // CẢNH BÁO: khi chạy phương thức này toàn bộ ảnh và video trong thư mục và các thư mục con đều bị xóa
    @Override
    public ApiResponse<String> deleteFolderMedia(String folderName) {
        try {
            deleteFolderContentsImage(folderName);

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


    private List<String> getAllMediaFromFolder(String folder) throws Exception {
        List<String> mediaUrl = new ArrayList<>();
        Map result = cloudinary.search()
                .expression("folder:" + folder)
                .execute();

        List<Map> resources = (List<Map>) result.get("resources");
        for (Map resource : resources) {
            String url = resource.get("url").toString();
            mediaUrl.add(url);
        }

        return mediaUrl;
    }

    @Override
    public ApiResponse<List<List<String>>> getAllMultipleMediaFromFolder(List<String> folders) throws Exception {

        List<List<String>> mediaUrls = new ArrayList<>();


        for(String folder : folders){
            List<String> mediaUrl = getAllMediaFromFolder(folder);
            mediaUrls.add(mediaUrl);
        }

        return ApiResponse.<List<List<String>>>builder()
                .message("Get all media successfully")
                .result(mediaUrls)
                .build();
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
