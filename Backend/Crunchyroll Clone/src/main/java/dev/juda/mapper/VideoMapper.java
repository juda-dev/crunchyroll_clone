package dev.juda.mapper;

import dev.juda.exception.AnimeNotFoundException;
import dev.juda.model.dto.request.SetVideoRequest;
import dev.juda.model.dto.response.VideoResponse;
import dev.juda.model.entity.VideoEntity;
import dev.juda.repository.AnimeRepository;

import java.util.UUID;

public class VideoMapper {

    public static VideoEntity setToEntity(SetVideoRequest request, AnimeRepository animeRepository) {
        VideoEntity entity = new VideoEntity();

        entity.setTitle(request.title());
        entity.setDescription(request.description());
        entity.setDuration(request.duration());
        entity.setPublished(request.published());
        entity.setSrcUuid(request.src());
        entity.setPosterUuid(request.poster());
        entity.setAnime(
                animeRepository.findById(
                        UUID.fromString(request.animeId())
                ).orElseThrow(AnimeNotFoundException::new)
        );

        return entity;
    }

    public static VideoResponse entityToResponse(VideoEntity entity) {
        return new VideoResponse(
                entity.getId().toString(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getDuration(),
                entity.getSrcUuid(),
                entity.getPosterUuid(),
                entity.getPublished()
        );
    }
}
