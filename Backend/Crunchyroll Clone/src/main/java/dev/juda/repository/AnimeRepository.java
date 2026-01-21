package dev.juda.repository;

import dev.juda.model.entity.AnimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AnimeRepository extends JpaRepository<AnimeEntity, UUID> {
}
