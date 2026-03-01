package dev.juda.model.dto.response;

public record VideoResponse(
        String id,
        String title,
        String description,
        Integer duration,
        String src,
        String poster,
        Boolean published
) {
}
