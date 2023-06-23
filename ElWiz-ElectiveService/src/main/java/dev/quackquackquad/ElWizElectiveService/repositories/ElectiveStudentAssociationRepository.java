package dev.quackquackquad.ElWizElectiveService.repositories;

import dev.quackquackquad.ElWizElectiveService.models.AssociationKey;
import dev.quackquackquad.ElWizElectiveService.models.ElectiveStudentAssociation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectiveStudentAssociationRepository extends JpaRepository<ElectiveStudentAssociation, AssociationKey> {
}
