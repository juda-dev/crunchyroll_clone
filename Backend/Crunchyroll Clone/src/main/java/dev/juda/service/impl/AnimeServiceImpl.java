package dev.juda.service.impl;

import dev.juda.repository.AnimeRepository;
import dev.juda.service.AnimeService;

public class AnimeServiceImpl implements AnimeService {

    private final AnimeRepository repository;

    public AnimeServiceImpl(AnimeRepository repository) {
        this.repository = repository;
    }
}
