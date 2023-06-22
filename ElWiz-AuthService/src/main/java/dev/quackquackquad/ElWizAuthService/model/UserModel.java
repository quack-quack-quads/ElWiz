package dev.quackquackquad.ElWizAuthService.model;
import dev.quackquackquad.ElWizAuthService.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserModel {
    private String email;

    private String password;

    private String name;

    private String gender;
}
