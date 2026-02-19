package dev.juda.mapper;

import dev.juda.exception.CategoryNotFoundException;
import dev.juda.model.dto.request.CreateAnimeRequest;
import dev.juda.model.entity.AnimeEntity;
import dev.juda.model.entity.CategoryEntity;
import dev.juda.repository.CategoryRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class AnimeMapper {

    public static AnimeEntity createToEntity(CreateAnimeRequest request, CategoryRepository repository) {
        AnimeEntity animeEntity = new AnimeEntity();

        animeEntity.setName(request.name());
        animeEntity.setDescription(request.description());
        animeEntity.setPosterUuid(request.poster());
        animeEntity.setBannerUuid(request.banner());

        Set<CategoryEntity> categories = request.categories().stream().map(categoryValue -> repository.findByValueIgnoreCase(categoryValue).orElseThrow(CategoryNotFoundException::new)).collect(Collectors.toSet());

        animeEntity.setCategories(categories);

        return animeEntity;
    }
}
