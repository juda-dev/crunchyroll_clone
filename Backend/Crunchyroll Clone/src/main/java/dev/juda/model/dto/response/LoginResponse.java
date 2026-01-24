package dev.juda.model.dto.response;

public record LoginResponse(
        String token,
        String email,
        String role
) {
}
