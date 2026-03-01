package dev.juda.service;

import dev.juda.model.dto.request.SetVideoRequest;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.PageResponse;
import dev.juda.model.dto.response.VideoResponse;

import java.util.UUID;

public interface VideoService {
    MessageResponse createVideoMetadata(SetVideoRequest request);

    PageResponse<VideoResponse> getAllVideosAnime(int page, int size, UUID animeId);

    MessageResponse updateVideo(UUID videoId, SetVideoRequest request);

    MessageResponse deleteVideo(UUID videoId);


}
