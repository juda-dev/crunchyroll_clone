package dev.juda.exception;

import dev.juda.model.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Collections;

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

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(RoleNotFoundException.class)
    public ErrorResponse handlerRoleNotFoundException() {
        return new ErrorResponse(
                ROLE_NOT_FOUND.getCode(),
                HttpStatus.NOT_FOUND,
                ROLE_NOT_FOUND.getMessage(),
                null,
                LocalDateTime.now()
        );
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserNotFoundException.class)
    public ErrorResponse handlerUserNotFoundException() {
        return new ErrorResponse(
                USER_NOT_FOUND.getCode(),
                HttpStatus.NOT_FOUND,
                USER_NOT_FOUND.getMessage(),
                null,
                LocalDateTime.now()
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorResponse handlerMethodArgumentNotValidException(MethodArgumentNotValidException ex) {

        BindingResult result = ex.getBindingResult();

        return new ErrorResponse(BAD_CREDENTIALS.getCode()
                , HttpStatus.BAD_REQUEST
                , BAD_CREDENTIALS.getMessage()
                , result.getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .toList()
                , LocalDateTime.now());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse handlerException(Exception ex){

        return new ErrorResponse(GENERIC_ERROR.getCode()
                , HttpStatus.INTERNAL_SERVER_ERROR
                , GENERIC_ERROR.getMessage()
                , Collections.singletonList(ex.getMessage())
                , LocalDateTime.now());
    }

}
