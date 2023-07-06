package dev.quackquackquad.ElWizElectiveService.requests;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class AssociationRequest {
    private String studentId;
    private String electiveId;
    private Date joiningDate;
}
