package dev.quackquackquad.ElWizAuthService.service;

import dev.quackquackquad.ElWizAuthService.entity.Role;
import dev.quackquackquad.ElWizAuthService.entity.UserEntity;
import dev.quackquackquad.ElWizAuthService.error.User_DuplicateEmailException;
import dev.quackquackquad.ElWizAuthService.error.User_WrongPasswordException;
import dev.quackquackquad.ElWizAuthService.model.UserModel;
import dev.quackquackquad.ElWizAuthService.model.User_LoginResponse;
import dev.quackquackquad.ElWizAuthService.model.User_SignUpResponse;
import dev.quackquackquad.ElWizAuthService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public User_SignUpResponse signup(UserModel user) throws User_DuplicateEmailException {
        // now passwords are hashed before storing them in db
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String userId = UUIDService.getUUID();
        UserEntity userEntity = UserEntity
                .builder()
                .id(userId)
                .email(user.getEmail())
                .password(user.getPassword())
                .name(user.getName())
                .gender(user.getGender())
                .role(Role.USER)
                .build();
        try{
            userRepository.save(userEntity);
        } catch (DataIntegrityViolationException e) {
            throw new User_DuplicateEmailException("Email already exists");
        }
        String token = jwtService.generateToken(userEntity);
        return User_SignUpResponse.builder()
                .token(token)
                .message("User registered successfully")
                .status(HttpStatus.CREATED)
                .build();
    }

    public User_LoginResponse login(UserModel user) throws User_WrongPasswordException {
        System.out.println("Authenticating user: " + user.getEmail());
        UserEntity userEntity = userRepository.findByEmail(user.getEmail());
        if (Objects.isNull(userEntity)) {
            throw new User_WrongPasswordException("User not found");
        }
        // compare password with hashed password
        if (!passwordEncoder.matches(user.getPassword(), userEntity.getPassword())) {
            throw new User_WrongPasswordException("Wrong password");
        }
        System.out.println("Authentication successful");
        // if we reach here, authentication is successful
        // generate jwt token and send it back
        String jwtToken = jwtService.generateToken(userEntity);
        return User_LoginResponse.builder()
                .token(jwtToken)
                .status(HttpStatus.OK)
                .message("User logged in successfully")
                .user(UserModel
                        .builder()
                        .email(userEntity.getEmail())
                        .name(userEntity.getName())
                        .gender(userEntity.getGender())
                        .build()
                ).build();
    }
}
