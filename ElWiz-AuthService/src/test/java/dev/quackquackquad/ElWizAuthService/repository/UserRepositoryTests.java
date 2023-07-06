package dev.quackquackquad.ElWizAuthService.repository;

import dev.quackquackquad.ElWizAuthService.entity.UserEntity;
import dev.quackquackquad.ElWizAuthService.service.UUIDService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
// sets up an in-memory H2 database
// so that we don't mix our actual database with our test database
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;

    private UserEntity userEntity;

    @BeforeEach
    public void init() {
        String uid = UUIDService.getUUID();
        this.userEntity = UserEntity.builder()
                .id(uid).email("rohit1@gmail.com").password("password").name("Rohit")
                .gender("M").role("ROLE_USER").build();
    }

    @Test
    public void UserRepository_SaveUser_ReturnSavedUserEntity() {
        UserEntity savedUser = userRepository.save(this.userEntity);

        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(savedUser.getId()).isEqualTo(this.userEntity.getId());
        Assertions.assertThat(savedUser.getEmail()).isEqualTo(this.userEntity.getEmail());
        Assertions.assertThat(savedUser.getPassword()).isEqualTo(this.userEntity.getPassword());
        Assertions.assertThat(savedUser.getName()).isEqualTo(this.userEntity.getName());
        Assertions.assertThat(savedUser.getGender()).isEqualTo(this.userEntity.getGender());
        Assertions.assertThat(savedUser.getRole()).isEqualTo(this.userEntity.getRole());
    }

    @Test
    public void UserRepository_GetUserByEmail_ReturnsUserEntity() {
        userRepository.save(this.userEntity);

        UserEntity user = userRepository.findByEmail(this.userEntity.getEmail());

        Assertions.assertThat(user).isNotNull();
        Assertions.assertThat(user.getId()).isEqualTo(this.userEntity.getId());
        Assertions.assertThat(user.getEmail()).isEqualTo(this.userEntity.getEmail());
        Assertions.assertThat(user.getPassword()).isEqualTo(this.userEntity.getPassword());
        Assertions.assertThat(user.getName()).isEqualTo(this.userEntity.getName());
        Assertions.assertThat(user.getGender()).isEqualTo(this.userEntity.getGender());
        Assertions.assertThat(user.getRole()).isEqualTo(this.userEntity.getRole());
    }
}
