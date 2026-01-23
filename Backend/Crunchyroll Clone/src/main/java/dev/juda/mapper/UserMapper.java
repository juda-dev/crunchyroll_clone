package dev.juda.mapper;

import dev.juda.model.entity.UserEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Set;

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
}
