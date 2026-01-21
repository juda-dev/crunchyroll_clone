package dev.juda.security.filter;

import dev.juda.util.ApiPaths;
import dev.juda.util.SecurityUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final SecurityUtils utils;

    public JwtAuthenticationFilter(SecurityUtils utils) {
        this.utils = utils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = extractJwt(request);
        String username = null;

        if (jwt != null) {
            username = utils.getUsernameFromToken(jwt);
        }

        if (shouldProcessAuthentication(username)) {
            processAuthentication(request, jwt, username);
        }
    }

    private String extractJwt(HttpServletRequest request) {
        final String authorizationHeader = request.getHeader(SecurityUtils.HEADER_AUTHORIZATION);
        final String requestUri = request.getRequestURI();

        if (authorizationHeader != null && authorizationHeader.startsWith(SecurityUtils.PREFIX_TOKEN)) {
            return authorizationHeader.substring(SecurityUtils.PREFIX_TOKEN.length());
        }

        boolean isMediaPath = ApiPaths.API_PATHS.stream().anyMatch(requestUri::startsWith);

        if (isMediaPath && request.getParameter("token") != null) {
            return request.getParameter("token");
        }

        return null;
    }

    private boolean shouldProcessAuthentication(String username) {
        return (username != null && SecurityContextHolder.getContext().getAuthentication() == null);
    }

    private void processAuthentication(HttpServletRequest request, String jwt, String username) {
        if (utils.validateToken(jwt)) {
            UserDetails userDetails = createUserDetailsFromToken(jwt, username);
            setAuthenticationInContext(request, userDetails);
        }
    }

    private UserDetails createUserDetailsFromToken(String jwt, String username) {
        String role = utils.getRoleFromToken(jwt);
        return User.builder()
                .username(username)
                .password("")
                .authorities(
                        Collections.singletonList(
                                new SimpleGrantedAuthority("ROLE_" + role)
                        ))
                .build();
    }

    private void setAuthenticationInContext(HttpServletRequest request, UserDetails userDetails) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
