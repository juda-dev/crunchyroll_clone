package dev.juda.service;

import dev.juda.model.dto.request.EmailRequest;
import dev.juda.model.dto.request.UserLoginRequest;
import dev.juda.model.dto.request.UserRegistrationRequest;
import dev.juda.model.dto.response.EmailValidationResponse;
import dev.juda.model.dto.response.LoginResponse;
import dev.juda.model.dto.response.MessageResponse;
import jakarta.validation.Valid;

public interface AuthService {
    MessageResponse signup(@Valid UserRegistrationRequest request);

    LoginResponse login(@Valid UserLoginRequest request);

    EmailValidationResponse validateEmail(@Valid EmailRequest request);

    MessageResponse verifyEmail(String token);

    MessageResponse resendVerificationEmail(String email);

    MessageResponse forgotPassword(String email);

    MessageResponse resetPassword(String token, String password);

    MessageResponse changePassword(String email, String currentPassword, String newPassword);

    LoginResponse currentUser(String email);
}
