package dev.juda.mapper;

import dev.juda.model.entity.CategoryEntity;

public class CategoryMapper {
    public static CategoryEntity createToEntity(String value) {
        CategoryEntity entity = new CategoryEntity();
        entity.setValue(value);
        return entity;
    }
}
