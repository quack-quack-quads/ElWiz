package dev.quackquackquad.ElWizAuthService.error;

public class User_DuplicateEmailException extends Exception{
    public User_DuplicateEmailException() {
    }

    public User_DuplicateEmailException(String message) {
        super(message);
    }

    public User_DuplicateEmailException(String message, Throwable cause) {
        super(message, cause);
    }

    public User_DuplicateEmailException(Throwable cause) {
        super(cause);
    }

    public User_DuplicateEmailException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

