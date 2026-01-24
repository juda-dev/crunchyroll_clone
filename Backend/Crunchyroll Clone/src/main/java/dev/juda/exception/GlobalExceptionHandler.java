package dev.juda.exception;

import dev.juda.model.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

import static dev.juda.util.ErrorCatalog.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AccountDeactivatedException.class)
    public ErrorResponse handlerAccountDeactivatedException() {
        return new ErrorResponse(
                ACCOUNT_DEACTIVATED.getCode(),
                HttpStatus.FORBIDDEN,
                ACCOUNT_DEACTIVATED.getMessage(),
                null,
                LocalDateTime.now()
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadCredentialsException.class)
    public ErrorResponse handlerBadCredentialsException() {
        return new ErrorResponse(
                BAD_CREDENTIALS.getCode(),
                HttpStatus.BAD_REQUEST,
                BAD_CREDENTIALS.getMessage(),
                null,
                LocalDateTime.now()
        );
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ErrorResponse handlerEmailAlreadyExistsException() {
        return new ErrorResponse(
                EMAIL_ALREADY_EXISTS.getCode(),
                HttpStatus.CONFLICT,
                EMAIL_ALREADY_EXISTS.getMessage(),
                null,
                LocalDateTime.now()
        );
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(EmailNotVerifiedException.class)
    public ErrorResponse handlerEmailNotVerifiedException() {
        return new ErrorResponse(
                EMAIL_NOT_VERIFIED.getCode(),
                HttpStatus.FORBIDDEN,
                EMAIL_NOT_VERIFIED.getMessage(),
                null,
                LocalDateTime.now()
        );
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(InvalidCredentialsException.class)
    public ErrorResponse handlerInvalidCredentialsException() {
        return new ErrorResponse(
                INVALID_CREDENTIALS.getCode(),
                HttpStatus.UNAUTHORIZED,
                INVALID_CREDENTIALS.getMessage(),
                null,
                LocalDateTime.now()
        );
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(InvalidTokenException.class)
    public ErrorResponse handlerInvalidTokenException() {
        return new ErrorResponse(
                INVALID_TOKEN.getCode(),
                HttpStatus.UNAUTHORIZED,
                INVALID_TOKEN.getMessage(),
                null,
                LocalDateTime.now()
        );
    }



}
