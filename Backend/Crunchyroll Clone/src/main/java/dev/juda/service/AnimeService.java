package dev.juda.service;

import dev.juda.model.dto.request.SetAnimeRequest;
import dev.juda.model.dto.response.AnimeResponse;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.PageResponse;

import java.util.UUID;

public interface AnimeService {
    MessageResponse createAnime(SetAnimeRequest request);

    PageResponse<AnimeResponse> getAllAnimes(int page, int size, String search);

    MessageResponse updateAnime(UUID id, SetAnimeRequest request);

    MessageResponse deleteAnime(UUID id);
}
