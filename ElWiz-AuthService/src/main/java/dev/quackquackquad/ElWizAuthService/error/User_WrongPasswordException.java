package dev.quackquackquad.ElWizAuthService.error;

public class User_WrongPasswordException extends Exception{

    public User_WrongPasswordException() {
    }

    public User_WrongPasswordException(String message) {
        super(message);
    }

    public User_WrongPasswordException(String message, Throwable cause) {
        super(message, cause);
    }

    public User_WrongPasswordException(Throwable cause) {
        super(cause);
    }

    public User_WrongPasswordException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}