package dev.quackquackquad.ElWizAuthService.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User_LogoutResponse {
    private String message;
    private HttpStatus status;
}

