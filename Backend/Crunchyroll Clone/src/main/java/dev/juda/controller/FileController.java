package dev.juda.controller;

import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.UploadResponse;
import dev.juda.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/files")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload/image")
    @PreAuthorize("hasRole('ADMIN')")
    public UploadResponse uploadImage(@RequestParam("file") MultipartFile file) {
        return fileService.storeImageFile(file);
    }

    @GetMapping("/images/animes/posters/{uuid}")
    public ResponseEntity<Resource> serveAnimePoster(
            @PathVariable String uuid,
            @RequestHeader HttpHeaders headers) {
        return fileService.serveImage(uuid);
    }

    @GetMapping("/images/animes/banners/{uuid}")
    public ResponseEntity<Resource> serveAnimeBanner(
            @PathVariable String uuid,
            @RequestHeader HttpHeaders headers) {
        return fileService.serveImage(uuid);
    }
}
