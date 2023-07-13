package dev.quackquackquad.ElWizAuthService.controller;

import dev.quackquackquad.ElWizAuthService.error.User_DuplicateEmailException;
import dev.quackquackquad.ElWizAuthService.error.User_WrongPasswordException;
import dev.quackquackquad.ElWizAuthService.model.UserModel;
import dev.quackquackquad.ElWizAuthService.model.User_LoginResponse;
import dev.quackquackquad.ElWizAuthService.model.User_LogoutResponse;
import dev.quackquackquad.ElWizAuthService.model.User_SignUpResponse;
import dev.quackquackquad.ElWizAuthService.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/auth-service/v1")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public User_SignUpResponse signup(@RequestBody UserModel user) throws User_DuplicateEmailException {
        return authService.signup(user);
    }

    @PostMapping("/login")
    public User_LoginResponse login(@RequestBody UserModel user, HttpServletResponse response) throws User_WrongPasswordException {
        User_LoginResponse authResponse = authService.login(user);
        if (Objects.nonNull(authResponse)) {
            Number maxAge = 1000 * 60 * 60 * 24; // 24 hours
            Cookie cookie = new Cookie("jwt", authResponse.getToken());
            // allow cookie to be from both http and https
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(1000 * 60);
            response.addCookie(cookie);
        }
        return authResponse;
    }

    @GetMapping("/logout")
    public User_LogoutResponse logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return User_LogoutResponse.builder()
                .message("User logged out successfully")
                .status(HttpStatus.OK)
                .build();
    }
}
