package dev.juda.service.impl;

import dev.juda.mapper.AnimeMapper;
import dev.juda.model.dto.request.CreateAnimeRequest;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.repository.AnimeRepository;
import dev.juda.repository.CategoryRepository;
import dev.juda.service.AnimeService;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseStatus;

public class AnimeServiceImpl implements AnimeService {

    private final AnimeRepository animeRepository;
    private final CategoryRepository categoryRepository;

    public AnimeServiceImpl(AnimeRepository animeRepository, CategoryRepository categoryRepository) {
        this.animeRepository = animeRepository;
        this.categoryRepository = categoryRepository;
    }


    @Override
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponse createAnime(CreateAnimeRequest request) {
        animeRepository.save(AnimeMapper.createToEntity(request, categoryRepository));
        return new MessageResponse("Anime created successfully");
    }
}
