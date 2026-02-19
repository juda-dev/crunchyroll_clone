package dev.juda.repository;

import dev.juda.model.entity.AnimeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface AnimeRepository extends JpaRepository<AnimeEntity, UUID> {

    @Query("SELECT a FROM AnimeEntity a WHERE " +
            "LOWER(a.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(a.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<AnimeEntity> searchAnime(@Param("search") String search, Pageable pageable);
}
