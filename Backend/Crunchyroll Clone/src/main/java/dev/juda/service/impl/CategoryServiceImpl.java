package dev.juda.service.impl;

import dev.juda.exception.CategoryAlreadyExistsException;
import dev.juda.mapper.CategoryMapper;
import dev.juda.model.dto.request.CreateCategoryRequest;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.repository.CategoryRepository;
import dev.juda.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseStatus;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;

    public CategoryServiceImpl(CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponse createCategory(CreateCategoryRequest request) {
        if (repository.existsByValueIgnoreCase(request.value())) throw new CategoryAlreadyExistsException();

        repository.save(CategoryMapper.createToEntity(request.value()));

        return new MessageResponse("Category created successfully");
    }
}
