package dev.juda.service.impl;

import dev.juda.repository.VideoRepository;
import dev.juda.service.VideoService;

public class VideoServiceImpl implements VideoService {

    private final VideoRepository repository;

    public VideoServiceImpl(VideoRepository repository) {
        this.repository = repository;
    }
}
