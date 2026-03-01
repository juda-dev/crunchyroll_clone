package dev.juda.controller;

import dev.juda.model.dto.request.SetVideoRequest;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.PageResponse;
import dev.juda.model.dto.response.VideoResponse;
import dev.juda.service.VideoService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/videos")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public MessageResponse createVideoMetadata(@Valid @RequestBody SetVideoRequest request){
        return videoService.createVideoMetadata(request);
    }

    @GetMapping("/{videoId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public PageResponse<VideoResponse> getAllVideosAnime(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @PathVariable UUID videoId){
        return videoService.getAllVideosAnime(page, size, videoId);
    }

    @PutMapping("/{videoId}")
    @PreAuthorize("hasRole('ADMIN')")
    public MessageResponse updateVideo(
            @Valid @RequestBody SetVideoRequest request, @PathVariable UUID videoId){
        return videoService.updateVideo(videoId, request);
    }

    @DeleteMapping("/{videoId}")
    @PreAuthorize("hasRole('ADMIN')")
    public MessageResponse deleteVideo(@PathVariable UUID videoId){
        return videoService.deleteVideo(videoId);
    }
}
