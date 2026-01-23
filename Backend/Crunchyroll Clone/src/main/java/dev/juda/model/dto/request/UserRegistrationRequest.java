package dev.juda.model.dto.request;

public record UserRegistrationRequest(String email, String password, String role) {
}
