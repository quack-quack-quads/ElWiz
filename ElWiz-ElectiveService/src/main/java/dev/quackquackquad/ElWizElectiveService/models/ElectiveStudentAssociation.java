package dev.quackquackquad.ElWizElectiveService.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@IdClass(AssociationKey.class)
public class ElectiveStudentAssociation {
    private Date joiningDate;

    @Id
    @ManyToOne
    private Student student;

    @Id
    @ManyToOne
    private Elective elective;
}
