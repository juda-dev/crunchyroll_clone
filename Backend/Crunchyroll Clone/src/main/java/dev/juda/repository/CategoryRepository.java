package dev.juda.repository;

import dev.juda.model.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<CategoryEntity, UUID> {

    Optional<CategoryEntity> findByValueIgnoreCase(String value);

    boolean existsByValueIgnoreCase(String value);
}
