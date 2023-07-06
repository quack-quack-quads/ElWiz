package dev.quackquackquad.ElWizAuthService.service;

import dev.quackquackquad.ElWizAuthService.entity.UserEntity;
import dev.quackquackquad.ElWizAuthService.model.UserModel;
import dev.quackquackquad.ElWizAuthService.model.User_LoginResponse;
import dev.quackquackquad.ElWizAuthService.model.User_SignUpResponse;
import dev.quackquackquad.ElWizAuthService.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTests {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @InjectMocks
    private AuthService authService;

    private UserModel user;
    private UserEntity userEntity;

    @BeforeEach
    public void init() {
        this.user = UserModel.builder()
                .email("rohit1@gmail.com").password("password")
                .name("Rohit Shah").gender("M").build();
        this.userEntity = UserEntity.builder()
                .id(UUIDService.getUUID())
                .email(user.getEmail()).password(user.getPassword())
                .name(user.getName()).role("ROLE_USER").gender(user.getGender())
                .build();
    }

    @Test
    public void AuthService_SignupUser_ReturnsUser_SignUpResponse() throws Exception{

        when(passwordEncoder.encode(Mockito.any(String.class))).thenReturn("encodedpassword");
        when(userRepository.save(Mockito.any(UserEntity.class))).thenReturn(userEntity);;
        when(jwtService.generateToken(Mockito.any(UserEntity.class))).thenReturn("token");

        User_SignUpResponse response = this.authService.signup(user);

        Assertions.assertThat(response).isNotNull();
        Assertions.assertThat(response.getToken()).isEqualTo("token");
        Assertions.assertThat(response.getStatus()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void AuthService_LoginUser_ReturnsUser_LoginResponse() throws Exception{
        when(userRepository.findByEmail(Mockito.any(String.class))).thenReturn(userEntity);
        when(passwordEncoder.matches(Mockito.any(String.class), Mockito.any(String.class))).thenReturn(true);
        when(jwtService.generateToken(Mockito.any(UserEntity.class))).thenReturn("token");

        User_LoginResponse response = this.authService.login(user);

        Assertions.assertThat(response).isNotNull();
        Assertions.assertThat(response.getToken()).isEqualTo("token");
        Assertions.assertThat(response.getStatus()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(response.getUser()).isNotNull();

        Assertions.assertThat(response.getUser().getEmail()).isEqualTo(user.getEmail());
        Assertions.assertThat(response.getUser().getName()).isEqualTo(user.getName());
        Assertions.assertThat(response.getUser().getGender()).isEqualTo(user.getGender());
        Assertions.assertThat(response.getUser().getPassword()).isNull();
    }
}
