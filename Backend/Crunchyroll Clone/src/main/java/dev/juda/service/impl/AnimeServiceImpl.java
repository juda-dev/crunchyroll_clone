package dev.juda.service.impl;

import dev.juda.mapper.AnimeMapper;
import dev.juda.model.dto.request.CreateAnimeRequest;
import dev.juda.model.dto.response.AnimeResponse;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.PageResponse;
import dev.juda.model.entity.AnimeEntity;
import dev.juda.repository.AnimeRepository;
import dev.juda.repository.CategoryRepository;
import dev.juda.service.AnimeService;
import dev.juda.util.PaginationUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Override
    @Transactional(readOnly = true)
    public PageResponse<AnimeResponse> getAllAnimes(int page, int size, String search) {
        Pageable pageable = PaginationUtils.createPageRequest(page, size);
        Page<AnimeEntity> animePage;

        if (search != null && !search.isBlank()) animePage = animeRepository.searchAnime(search, pageable);
        else animePage = animeRepository.findAll(pageable);

        return PaginationUtils.toPageResponse(animePage, AnimeMapper::entityToResponse);
    }
}
