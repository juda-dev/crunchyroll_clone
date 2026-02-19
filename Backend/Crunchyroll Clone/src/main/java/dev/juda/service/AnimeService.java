package dev.juda.service;

import dev.juda.model.dto.request.CreateAnimeRequest;
import dev.juda.model.dto.response.AnimeResponse;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.PageResponse;
import dev.juda.model.entity.AnimeEntity;

public interface AnimeService {
    MessageResponse createAnime(CreateAnimeRequest request);

    PageResponse<AnimeResponse> getAllAnimes(int page, int size, String search);
}
