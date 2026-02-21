package dev.juda.service;

import dev.juda.model.dto.request.CreateCategoryRequest;
import dev.juda.model.dto.response.MessageResponse;

public interface CategoryService {
    MessageResponse createCategory(CreateCategoryRequest request);
}
