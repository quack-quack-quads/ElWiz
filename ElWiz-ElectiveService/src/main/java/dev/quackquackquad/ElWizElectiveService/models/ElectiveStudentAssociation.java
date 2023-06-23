package dev.quackquackquad.ElWizElectiveService.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
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
