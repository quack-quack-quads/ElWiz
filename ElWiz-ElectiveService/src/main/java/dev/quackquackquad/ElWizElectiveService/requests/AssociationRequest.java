package dev.quackquackquad.ElWizElectiveService.requests;

import lombok.Data;

import java.util.Date;

@Data
public class AssociationRequest {
    private String studentId;
    private String electiveId;
    private Date joiningDate;
}
