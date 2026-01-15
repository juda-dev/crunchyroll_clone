package dev.juda.util;

import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;

public class SecurityUtils {

    public static final SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();
    public final static String PREFIX_TOKEN = "Bearer ";
    public final static String HEADER_AUTHORIZATION = "Authorization";
    public static final String CONTENT_TYPE = "application/json";

}
