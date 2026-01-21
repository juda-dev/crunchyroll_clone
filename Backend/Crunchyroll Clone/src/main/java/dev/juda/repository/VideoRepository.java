package dev.juda.repository;

import dev.juda.model.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VideoRepository extends JpaRepository<VideoEntity, UUID> {
}
