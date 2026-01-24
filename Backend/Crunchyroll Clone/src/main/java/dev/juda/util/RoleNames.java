package dev.juda.util;

public enum RoleNames {
    ADMIN("ADMIN"),
    USER("USER");

    private final String value;

    RoleNames(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
