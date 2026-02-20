package dev.juda.service.impl;

import dev.juda.exception.EmptyFileException;
import dev.juda.exception.FileNotFoundException;
import dev.juda.exception.StorageDirectoryCreationFailedException;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.service.FileService;
import dev.juda.util.FileHandlerUtil;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    private Path videoStorageLocation;
    private Path imageStorageLocation;

    @Value("${file.upload.video-dir}")
    private String videoDir;

    @Value("${file.upload.image-dir}")
    private String imageDir;

    @PostConstruct
    public void init() {
        this.videoStorageLocation = Paths.get(videoDir).toAbsolutePath().normalize();
        this.imageStorageLocation = Paths.get(imageDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.videoStorageLocation);
            Files.createDirectories(this.imageStorageLocation);
        } catch (IOException e) {
            throw new StorageDirectoryCreationFailedException();
        }
    }

    @Override
    public MessageResponse storeVideoFile(MultipartFile file) {
        return storeFile(file, this.videoStorageLocation);
    }

    @Override
    public MessageResponse storeImageFile(MultipartFile file) {
        return storeFile(file, this.imageStorageLocation);
    }

    private MessageResponse storeFile(MultipartFile file, Path storageLocation) {
        if (file.isEmpty()) throw new EmptyFileException();

        String fileExtension = FileHandlerUtil.extractFileExtension(file.getOriginalFilename());
        String uuid = UUID.randomUUID().toString();
        String fileName = uuid + fileExtension;

        try {
            Path targetLocation = storageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return new MessageResponse(uuid);
        } catch (IOException ex) {
            throw new StorageDirectoryCreationFailedException();
        }
    }

    @Override
    public ResponseEntity<Resource> serveVideo(String uuid) {
        return serveResource(uuid, this.videoStorageLocation);
    }

    @Override
    public ResponseEntity<Resource> serveImage(String uuid) {
        return serveResource(uuid, this.imageStorageLocation);
    }

    private ResponseEntity<Resource> serveResource(String uuid, Path storageLocation) {
        try {
            var filePath = FileHandlerUtil.findFileByUUID(storageLocation, uuid);
            Resource resource = new FileSystemResource(filePath);

            if (!resource.exists() || !resource.isReadable()) throw new FileNotFoundException();

            var mediaType = MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM);

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            throw new FileNotFoundException();
        }
    }
}
