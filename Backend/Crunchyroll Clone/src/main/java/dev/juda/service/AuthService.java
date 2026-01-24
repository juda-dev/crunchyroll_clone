package dev.juda.service;

import dev.juda.model.dto.request.*;
import dev.juda.model.dto.response.EmailValidationResponse;
import dev.juda.model.dto.response.LoginResponse;
import dev.juda.model.dto.response.MessageResponse;
import jakarta.validation.Valid;

public interface AuthService {
    MessageResponse signup(@Valid UserRegistrationRequest request);

    LoginResponse login(@Valid UserLoginRequest request);

    EmailValidationResponse validateEmail(String email);

    MessageResponse verifyEmail(String token);

    MessageResponse resendVerificationEmail(@Valid EmailRequest request);

    MessageResponse forgotPassword(@Valid EmailRequest request);

    MessageResponse resetPassword(@Valid ResetPasswordRequest request);

    MessageResponse changePassword(@Valid ChangePasswordRequest request);

    LoginResponse currentUser(String email);
}
