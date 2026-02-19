package dev.juda.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateAnimeRequest(@NotBlank String name,
                                 @Size(max = 1000) String description,
                                 @NotBlank String poster,
                                 @NotBlank String banner,
                                 @NotNull List<String> categories) {
}
