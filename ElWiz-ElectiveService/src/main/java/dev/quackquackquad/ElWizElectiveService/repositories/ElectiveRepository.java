package dev.quackquackquad.ElWizElectiveService.repositories;

import dev.quackquackquad.ElWizElectiveService.models.Elective;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectiveRepository  extends JpaRepository<Elective, String> {
}
