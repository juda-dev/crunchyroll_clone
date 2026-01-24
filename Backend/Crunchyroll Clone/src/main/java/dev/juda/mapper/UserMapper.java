package dev.juda.mapper;

import dev.juda.exception.RoleNotFoundException;
import dev.juda.model.dto.request.UserRegistrationRequest;
import dev.juda.model.entity.UserEntity;
import dev.juda.repository.RoleRepository;
import dev.juda.util.RoleNames;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public class UserMapper {

    public static User toUserDetails(UserEntity userEntity) {
        return new User(
                userEntity.getEmail(),
                userEntity.getPassword(),
                userEntity.getActive(),
                true,
                true,
                true,
                Set.of(new SimpleGrantedAuthority("ROLE_" + userEntity.getRole().getValue()))
        );
    }

    public static UserEntity registrationToEntity(
            UserRegistrationRequest request,
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository
    ){
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(request.email());
        userEntity.setPassword(passwordEncoder.encode(request.password()));
        userEntity.setRole(
                roleRepository.findByValue(
                        RoleNames.USER.getValue()).orElseThrow(RoleNotFoundException::new)
        );
        userEntity.setActive(true);
        userEntity.setEmailVerified(false);
        userEntity.setVerificationToken(UUID.randomUUID().toString());
        userEntity.setVerificationTokenExpiry(Instant.now().plusSeconds(86400));

        return userEntity;
    }
}
