package dev.quackquackquad.ElWizAuthService.repository;

import dev.quackquackquad.ElWizAuthService.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findByEmail(String email);
}
