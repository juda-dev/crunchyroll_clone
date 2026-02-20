package dev.juda.service;

import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.UploadResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    UploadResponse storeVideoFile(MultipartFile file);
    UploadResponse storeImageFile(MultipartFile file);
    ResponseEntity<Resource> serveVideo(String uuid);
    ResponseEntity<Resource> serveImage(String uuid);
}
