package dev.juda.service;

import dev.juda.model.dto.response.MessageResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    MessageResponse storeVideoFile(MultipartFile file);
    MessageResponse storeImageFile(MultipartFile file);
    ResponseEntity<Resource> serveVideo(String uuid);
    ResponseEntity<Resource> serveImage(String uuid);
}
