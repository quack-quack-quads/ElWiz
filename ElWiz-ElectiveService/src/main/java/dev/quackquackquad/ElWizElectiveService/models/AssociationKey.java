package dev.quackquackquad.ElWizElectiveService.models;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssociationKey implements Serializable {
    private Student student;
    private Elective elective;
}
