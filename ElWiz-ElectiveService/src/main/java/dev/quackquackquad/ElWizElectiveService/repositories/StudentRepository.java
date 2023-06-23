package dev.quackquackquad.ElWizElectiveService.repositories;

import dev.quackquackquad.ElWizElectiveService.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
}
