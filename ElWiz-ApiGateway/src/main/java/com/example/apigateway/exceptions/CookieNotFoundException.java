package com.example.apigateway.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class CookieNotFoundException extends RuntimeException{
    public CookieNotFoundException(String format){
        super(format);
    }
}
