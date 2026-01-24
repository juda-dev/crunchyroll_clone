package dev.juda.controller;

import dev.juda.model.dto.request.*;
import dev.juda.model.dto.response.EmailValidationResponse;
import dev.juda.model.dto.response.LoginResponse;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public MessageResponse signup(@RequestBody UserRegistrationRequest request){
        return authService.signup(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody UserLoginRequest request){
        return authService.login(request);
    }

    @PostMapping("/validate-email")
    public EmailValidationResponse validateEmail(@RequestParam String email){
        return authService.validateEmail(email);
    }

    @GetMapping("/verify-email")
    public MessageResponse verifyEmail(@RequestParam String token){
        return authService.verifyEmail(token);
    }

    @PostMapping("/resend-verification-email")
    public MessageResponse resendVerification(@RequestBody EmailRequest request){
        return authService.resendVerificationEmail(request);
    }

    @PostMapping("/forgot-password")
    public MessageResponse forgotPassword(@RequestBody EmailRequest request){
        return authService.forgotPassword(request);
    }

    @PostMapping("/reset-password")
    public MessageResponse resetPassword(@RequestBody ResetPasswordRequest request){
        return authService.resetPassword(request);
    }

    @PostMapping("/change-password")
    public MessageResponse changePassword(@RequestBody ChangePasswordRequest request){
        return authService.changePassword(request);
    }

    @GetMapping("/current-user")
    public LoginResponse currentUser(Authentication authentication){
        return authService.currentUser(authentication.getName());
    }
}
