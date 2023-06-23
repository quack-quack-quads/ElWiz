package dev.quackquackquad.ElWizElectiveService.requests;

import lombok.Data;

@Data
public class DissociationRequest {
    private String studentId;
    private String electiveId;
}
