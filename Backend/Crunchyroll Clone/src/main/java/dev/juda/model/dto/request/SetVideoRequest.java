package dev.juda.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SetVideoRequest(
        @NotBlank String title,
        @NotBlank String description,
        @NotNull Integer duration,
        @NotNull Boolean published,
        @NotBlank String src,
        @NotBlank String poster,
        @NotBlank String animeId
) {
}
