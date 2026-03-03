package dev.juda.service.impl;

import dev.juda.exception.AnimeNotFoundException;
import dev.juda.exception.CategoryNotFoundException;
import dev.juda.mapper.AnimeMapper;
import dev.juda.model.dto.request.SetAnimeRequest;
import dev.juda.model.dto.response.AnimeResponse;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.PageResponse;
import dev.juda.model.entity.AnimeEntity;
import dev.juda.model.entity.CategoryEntity;
import dev.juda.repository.AnimeRepository;
import dev.juda.repository.CategoryRepository;
import dev.juda.service.AnimeService;
import dev.juda.util.PaginationUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.*;
import java.util.stream.Collectors;

@Service
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
    public MessageResponse createAnime(SetAnimeRequest request) {
        animeRepository.save(AnimeMapper.setToEntity(request, categoryRepository));
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

    @Override
    @Transactional
    public MessageResponse updateAnime(UUID id, SetAnimeRequest request) {
        AnimeEntity anime = animeRepository.findById(id).orElseThrow(AnimeNotFoundException::new);
        anime.setName(request.name());
        anime.setDescription(request.description());
        anime.setPosterUuid(request.poster());
        anime.setBannerUuid(request.banner());

        Set<CategoryEntity> categories = request.categories().stream().map(categoryValue -> categoryRepository.findByValueIgnoreCase(categoryValue).orElseThrow(CategoryNotFoundException::new)).collect(Collectors.toSet());

        anime.setCategories(categories);

        animeRepository.save(anime);
        return new MessageResponse("Anime updated successfully");
    }

    @Override
    @Transactional
    public MessageResponse deleteAnime(UUID id) {
        if (!animeRepository.existsById(id)) throw new AnimeNotFoundException();

        animeRepository.deleteById(id);

        return new MessageResponse("Anime deleted successfully");
    }

    @Override
    @Transactional(readOnly = true)
    public AnimeResponse getAnime(UUID id) {
        return animeRepository.findById(id).map(AnimeMapper::entityToResponse).orElseThrow(AnimeNotFoundException::new);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AnimeResponse> getRandomAnimes() {
        long totalAnimes = animeRepository.count();

        List<AnimeResponse> result = new ArrayList<>();

        if (totalAnimes <= 0) throw new AnimeNotFoundException();

        Random random = new Random();
        Set<Integer> randomIndices = new HashSet<>();

        int quantitySearch = 4;

        while(quantitySearch > totalAnimes) quantitySearch--;

        while (randomIndices.size() < quantitySearch) {
            int randomIdx = random.nextInt((int) totalAnimes);
            randomIndices.add(randomIdx);
        }

        randomIndices.forEach(idx -> {
            Page<AnimeResponse> page = animeRepository.findAll(PageRequest.of(idx, 1)).map(AnimeMapper::entityToResponse);

            if (page.hasContent()) result.add(page.getContent().getFirst());
        });

        return result;
    }
}
