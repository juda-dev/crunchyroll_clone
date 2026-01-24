package dev.juda.service.impl;

import dev.juda.exception.*;
import dev.juda.mapper.UserMapper;
import dev.juda.model.dto.request.EmailRequest;
import dev.juda.model.dto.request.UserLoginRequest;
import dev.juda.model.dto.request.UserRegistrationRequest;
import dev.juda.model.dto.response.EmailValidationResponse;
import dev.juda.model.dto.response.LoginResponse;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.entity.UserEntity;
import dev.juda.repository.RoleRepository;
import dev.juda.repository.UserRepository;
import dev.juda.service.AuthService;
import dev.juda.service.EmailService;
import dev.juda.util.SecurityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final SecurityUtils securityUtils;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, EmailService emailService, SecurityUtils securityUtils) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.securityUtils = securityUtils;
    }

    @Transactional
    @Override
    public MessageResponse signup(UserRegistrationRequest request) {
        if (userRepository.existsByEmail(request.email())) throw new EmailAlreadyExistsException();

        UserEntity userEntity = UserMapper.registrationToEntity(
                request, passwordEncoder, roleRepository
        );

        userRepository.save(userEntity);

        emailService.sendVerificationEmail(userEntity.getEmail(), userEntity.getVerificationToken());

        return new MessageResponse(
                "Registration successful! Please check your email to verify your account"
        );
    }

    @Transactional(readOnly = true)
    @Override
    public LoginResponse login(UserLoginRequest request) {
        UserEntity userEntity = userRepository.findByEmail(request.email())
                .filter(u -> passwordEncoder.matches(request.password(), u.getPassword()))
                .orElseThrow(BadCredentialsException::new);

        if (!userEntity.getActive()) throw new AccountDeactivatedException();
        if (!userEntity.getEmailVerified()) throw new EmailNotVerifiedException();

        String role = userEntity.getRole().getValue();

        final String jwt = securityUtils.generatedToken(request.email(), role);

        return new LoginResponse(
                jwt,
                request.email(),
                role
        );
    }

    @Transactional(readOnly = true)
    @Override
    public EmailValidationResponse validateEmail(EmailRequest request) {
        boolean exists = userRepository.existsByEmail(request.email());
        return new EmailValidationResponse(exists, !exists);
    }

    @Transactional
    @Override
    public MessageResponse verifyEmail(String token) {
        UserEntity userEntity = userRepository
                .findByVerificationToken(token)
                .orElseThrow(InvalidTokenException::new);

        if (userEntity.getVerificationTokenExpiry() == null || userEntity.getVerificationTokenExpiry().isBefore(Instant.now()))
            throw new InvalidTokenException();

        userEntity.setEmailVerified(true);
        userEntity.setVerificationToken(null);
        userEntity.setVerificationTokenExpiry(null);

        userRepository.save(userEntity);

        return new MessageResponse("Email verified successfully! you can now login.");
    }

    @Transactional
    @Override
    public MessageResponse resendVerificationEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);

        userEntity.setVerificationToken(UUID.randomUUID().toString());
        userEntity.setVerificationTokenExpiry(Instant.now().plusSeconds(86400));

        userRepository.save(userEntity);

        emailService.sendVerificationEmail(userEntity.getEmail(), userEntity.getVerificationToken());

        return new MessageResponse("Verification email resent successfully! Please check your inbox.");
    }

    @Transactional
    @Override
    public MessageResponse forgotPassword(String email) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);

        String resetToken = UUID.randomUUID().toString();

        userEntity.setPasswordResetToken(resetToken);
        userEntity.setPasswordResetTokenExpiry(Instant.now().plusSeconds(3600));

        userRepository.save(userEntity);

        emailService.sendPasswordResetEmail(userEntity.getEmail(), userEntity.getPasswordResetToken());

        return new MessageResponse("Password reset email sent successfully! Please check your inbox.");
    }

    @Transactional
    @Override
    public MessageResponse resetPassword(String token, String password) {
        UserEntity userEntity = userRepository.findByPasswordResetToken(token)
                .orElseThrow(InvalidTokenException::new);

        if (userEntity.getPasswordResetToken() == null || userEntity.getPasswordResetTokenExpiry().isBefore(Instant.now()))
            throw new InvalidTokenException();

        userEntity.setPassword(passwordEncoder.encode(password));
        userEntity.setPasswordResetToken(null);
        userEntity.setPasswordResetTokenExpiry(null);

        userRepository.save(userEntity);

        return new MessageResponse("Password reset successfully. You can now log in with your new password.");
    }

    @Transactional
    @Override
    public MessageResponse changePassword(String email, String currentPassword, String newPassword) {
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        if (!passwordEncoder.matches(currentPassword, userEntity.getPassword())) throw new InvalidTokenException();

        userEntity.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(userEntity);

        return new MessageResponse("Password changed successfully.");
    }

    @Transactional(readOnly = true)
    @Override
    public LoginResponse currentUser(String email) {
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        return new LoginResponse(
                null,
                userEntity.getEmail(),
                userEntity.getRole().getValue()
        );
    }
}
