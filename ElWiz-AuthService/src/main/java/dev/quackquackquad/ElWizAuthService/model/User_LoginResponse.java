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
public class User_LoginResponse {
    private String token;
    private HttpStatus status;
    private String message;
    private UserModel user;
}
