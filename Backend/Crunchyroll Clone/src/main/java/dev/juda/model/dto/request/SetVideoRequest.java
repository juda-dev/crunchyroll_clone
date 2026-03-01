package dev.juda.model.dto.request;

public record SetVideoRequest(
        String title,
        String description,
        Integer duration,
        Boolean published,
        String src,
        String poster,
        String animeId
) {
}
