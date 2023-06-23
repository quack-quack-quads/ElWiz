package dev.quackquackquad.ElWizElectiveService.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Elective {
    @Id
    private String code;
    private String name;
    private String description;

    @OneToMany(mappedBy = "elective")
    @JsonIgnore
    private List<ElectiveStudentAssociation> associations;
}

