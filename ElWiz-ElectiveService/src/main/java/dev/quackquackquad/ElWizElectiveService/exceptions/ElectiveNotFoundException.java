package dev.quackquackquad.ElWizElectiveService.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ElectiveNotFoundException extends RuntimeException{
    public ElectiveNotFoundException(String format){
        super(format);
    }
}
