package dev.quackquackquad.ElWizAuthService.error;

import dev.quackquackquad.ElWizAuthService.model.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice(
        basePackages = "dev.quackquackquad.ElWizAuthService.controller"
)
@ResponseStatus
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(User_WrongPasswordException.class)
    public ResponseEntity<ErrorMessage> handleUser_WrongPasswordException(User_WrongPasswordException exception,
                                                                          WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.UNAUTHORIZED, exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
    }

    @ExceptionHandler(User_DuplicateEmailException.class)
    public ResponseEntity<ErrorMessage> handleUser_DuplicateEmailException(User_DuplicateEmailException exception,
                                                                           WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.CONFLICT, exception.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(message);
    }
}
