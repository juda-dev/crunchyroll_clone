package dev.juda.service.impl;

import dev.juda.mapper.VideoMapper;
import dev.juda.model.dto.request.SetVideoRequest;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.PageResponse;
import dev.juda.model.dto.response.VideoResponse;
import dev.juda.model.entity.VideoEntity;
import dev.juda.repository.AnimeRepository;
import dev.juda.repository.VideoRepository;
import dev.juda.service.VideoService;
import dev.juda.util.PaginationUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.UUID;

public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;
    private final AnimeRepository animeRepository;

    public VideoServiceImpl(VideoRepository repository, AnimeRepository animeRepository) {
        this.videoRepository = repository;
        this.animeRepository = animeRepository;
    }

    @Override
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponse createVideoMetadata(SetVideoRequest request) {
        videoRepository.save(VideoMapper.setToEntity(request, animeRepository));
        return new MessageResponse("Video Created Successfully");
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<VideoResponse> getAllVideosAnime(int page, int size, UUID animeId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").ascending());
        Page<VideoEntity> videoPage = videoRepository.findByAnimeId(animeId, pageable);

        return PaginationUtils.toPageResponse(videoPage, VideoMapper::entityToResponse);
    }

    @Override
    public MessageResponse updateVideo(UUID videoId, SetVideoRequest request) {
        return null;
    }

    @Override
    public MessageResponse deleteVideo(UUID videoId) {
        return null;
    }
}
