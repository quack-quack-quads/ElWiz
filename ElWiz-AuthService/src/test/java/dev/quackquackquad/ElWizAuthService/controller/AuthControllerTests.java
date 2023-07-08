package dev.quackquackquad.ElWizAuthService.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.quackquackquad.ElWizAuthService.model.UserModel;
import dev.quackquackquad.ElWizAuthService.model.User_LoginResponse;
import dev.quackquackquad.ElWizAuthService.model.User_SignUpResponse;
import dev.quackquackquad.ElWizAuthService.service.AuthService;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(controllers = AuthController.class)
@AutoConfigureMockMvc(addFilters = false) // disable any security filters
@ExtendWith(MockitoExtension.class)
public class AuthControllerTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    private UserModel user;

    @BeforeEach
    public void init() {
        this.user = UserModel.builder()
                .email("rohit1@gmail.com").password("password")
                .name("Rohit Shah").gender("M").build();
    }

    @Test
    public void AuthController_Signup_ReturnsUser_SignUpResponse() throws Exception {
        User_SignUpResponse signUpResponse = User_SignUpResponse.builder()
                .token("token").status(HttpStatus.CREATED)
                .message("User registered successfully")
                .build();

        when(authService.signup(Mockito.any(UserModel.class))).thenReturn(signUpResponse);

        ResultActions response = mockMvc.perform(post("/auth-service/v1/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(this.user)));

        response.andExpect(MockMvcResultMatchers.jsonPath("$.token").value("token"))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void AuthController_Login_ReturnsUser_LoginResponse() throws Exception {
        User_LoginResponse loginResponse = User_LoginResponse.builder()
                .token("token").status(HttpStatus.OK)
                .message("User logged in successfully")
                .user(user)
                .build();

        when(authService.login(Mockito.any(UserModel.class))).thenReturn(loginResponse);

        ResultActions response = mockMvc.perform(post("/auth-service/v1/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(this.user)));

        response.andExpect(MockMvcResultMatchers.jsonPath("$.token").value("token"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.user.email").value(this.user.getEmail()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.user.name").value(this.user.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.user.gender").value(this.user.getGender()))
                .andExpect(MockMvcResultMatchers.cookie().exists("jwt"))
                .andExpect(MockMvcResultMatchers.cookie().value("jwt", "token"))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void AuthController_Logout_ReturnsUser_LogoutResponse() throws Exception {
        ResultActions response = mockMvc.perform(get("/auth-service/v1/logout")
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(new Cookie("jwt", "token")));

        response.andExpect(MockMvcResultMatchers.cookie().value("jwt", ""));
    }
}