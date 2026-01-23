package dev.juda.util;

public enum ErrorCatalog {
    EMAIL_ALREADY_EXISTS("ERR_AUTH_001", "Email already exists."),
    BAD_CREDENTIALS("ERR_AUTH_002", "Invalid email or password."),
    ACCOUNT_DEACTIVATED("ERR_AUTH_003", "Your account has been deactivated. Please contact support for assistance."),
    EMAIL_NOT_VERIFIED("ERR_AUTH_004", "Please verify your email before login in. Check your inbox for the verification link."),
    INVALID_TOKEN("ERR_AUTH_005", "Invalid or expired verification token. Please request a new one."),
    INVALID_CREDENTIALS("ERR_AUTH_006", "Current password is incorrect"),
    ;

    private final String code;
    private final String message;

    ErrorCatalog(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
