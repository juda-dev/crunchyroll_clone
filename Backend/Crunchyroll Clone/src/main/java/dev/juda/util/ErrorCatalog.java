package dev.juda.util;

public enum ErrorCatalog {
    EMAIL_ALREADY_EXISTS("ERR_AUTH_001", "Email already exists."),
    BAD_CREDENTIALS("ERR_AUTH_002", "Invalid email or password."),
    ACCOUNT_DEACTIVATED("ERR_AUTH_003", "Your account has been deactivated. Please contact support for assistance."),
    EMAIL_NOT_VERIFIED("ERR_AUTH_004", "Please verify your email before login in. Check your inbox for the verification link."),
    INVALID_TOKEN("ERR_AUTH_005", "Invalid or expired verification token. Please request a new one."),
    INVALID_CREDENTIALS("ERR_AUTH_006", "Current password is incorrect"),
    GENERIC_ERROR("ERR_GEN_001", "An unexpected error"),
    ROLE_NOT_FOUND("ERR_ROLE_001", "Role not found in the database"),
    USER_NOT_FOUND("ERR_USR_001", "User not found in the database"),
    FILE_NOT_FOUND("ERR_FILE_001", "File not found in the server"),
    CATEGORY_NOT_FOUND("ERR_CAT_001", "Category not found in the database"),
    ANIME_NOT_FOUND("ERR_ANM_001", "Anime not found in the database"),
    STORAGE_DIRECTORY_CREATION_FAILED("ERR_STR_001", "Failed to create storage directory"),
    EMPTY_FILE("ERR_FILE_002", "File is empty"),
    CATEGORY_ALREADY_EXISTS("ERR_CAT_002", "Category already exists")
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
