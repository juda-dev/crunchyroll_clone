package dev.juda.repository;

import dev.juda.model.entity.VideoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface VideoRepository extends JpaRepository<VideoEntity, UUID> {
    Page<VideoEntity> findByAnimeId(UUID animeId, Pageable pageable);
}
