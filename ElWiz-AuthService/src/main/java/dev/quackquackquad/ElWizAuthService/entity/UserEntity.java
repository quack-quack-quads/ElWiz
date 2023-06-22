package dev.quackquackquad.ElWizAuthService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity implements UserDetails {
    @Id
    private String id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "gender")
    private String gender;

    @Enumerated(EnumType.STRING) // tells hibernate to store the enum as a string
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // should return a list of granted authorities(roles) for the user
        // we will return a list of SimpleGrantedAuthority
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public boolean isAccountNonExpired() {
        // if account is expired, return false
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        // if account is locked, return false
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // if credentials are expired, return false
        return true;
    }
    @Override
    public boolean isEnabled() {
        // if account is disabled, return false
        return true;
    }
}
