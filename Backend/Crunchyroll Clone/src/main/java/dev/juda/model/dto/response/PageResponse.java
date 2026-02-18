package dev.juda.model.dto.response;

import java.util.List;

public record PageResponse<T>(List<T> content, Long totalElements, Integer totalPages, Integer number, Integer size) {}
