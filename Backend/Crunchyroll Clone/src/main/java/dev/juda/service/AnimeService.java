package dev.juda.service;

import dev.juda.model.dto.request.CreateAnimeRequest;
import dev.juda.model.dto.response.MessageResponse;

public interface AnimeService {
    MessageResponse createAnime(CreateAnimeRequest request);
}
