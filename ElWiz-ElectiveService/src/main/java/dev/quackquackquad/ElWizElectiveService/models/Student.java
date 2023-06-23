package dev.quackquackquad.ElWizElectiveService.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student {
    private String name;

    @Id
    private String email;

    private String phoneNumber;

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private List<ElectiveStudentAssociation> associations;
}
