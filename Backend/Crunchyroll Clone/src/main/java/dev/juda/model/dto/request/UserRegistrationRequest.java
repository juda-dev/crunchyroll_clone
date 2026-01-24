package dev.juda.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRegistrationRequest(
        @Email @NotBlank String email,
        @NotBlank String password,
        String role) {
}
