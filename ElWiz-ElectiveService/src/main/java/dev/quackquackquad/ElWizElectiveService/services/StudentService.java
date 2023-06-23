package dev.quackquackquad.ElWizElectiveService.services;

import dev.quackquackquad.ElWizElectiveService.exceptions.ElectiveNotFoundException;
import dev.quackquackquad.ElWizElectiveService.exceptions.StudentNotFoundException;
import dev.quackquackquad.ElWizElectiveService.models.AssociationKey;
import dev.quackquackquad.ElWizElectiveService.models.Elective;
import dev.quackquackquad.ElWizElectiveService.models.ElectiveStudentAssociation;
import dev.quackquackquad.ElWizElectiveService.models.Student;
import dev.quackquackquad.ElWizElectiveService.repositories.ElectiveRepository;
import dev.quackquackquad.ElWizElectiveService.repositories.ElectiveStudentAssociationRepository;
import dev.quackquackquad.ElWizElectiveService.repositories.StudentRepository;
import dev.quackquackquad.ElWizElectiveService.requests.AssociationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ElectiveRepository electiveRepository;
    @Autowired
    private ElectiveStudentAssociationRepository associationRepository;
    public Student addStudent(Student student){
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }
    public Student getStudentById(String id){
        Optional<Student> student = studentRepository.findById(id);
        if(student.isEmpty()){
            throw new StudentNotFoundException(String.format("Student not found with id = %s", id));
        }
        return student.get();
    }

    public void deleteStudentById(String id){
        studentRepository.deleteById(id);
    }

    public ElectiveStudentAssociation addElectiveById(AssociationRequest request){
        Student student = getStudentById(request.getStudentId());
        Optional<Elective> electiveOptional = electiveRepository.findById(request.getElectiveId());
        if(electiveOptional.isEmpty()){
            throw new ElectiveNotFoundException(String.format("Elective not found with id = %s", request.getElectiveId()));
        }
        Elective elective = electiveOptional.get();

        ElectiveStudentAssociation association = new ElectiveStudentAssociation(
                request.getJoiningDate(),
                student,
                elective
        );
        return associationRepository.save(association);
    }

    public List<Elective> getElectiveByStudentId(String studentId){
        Optional<Student> student = studentRepository.findById(studentId);
        if(student.isEmpty()){
            throw new StudentNotFoundException(String.format("Student not found with id = %s", studentId));
        }
        return student.get().getAssociations().stream().map(ElectiveStudentAssociation::getElective).toList();
    }

    public void removeElective(String studentId, String electiveId){
        Student student = getStudentById(studentId);
        Optional<Elective> electiveOptional = electiveRepository.findById(electiveId);
        if(electiveOptional.isEmpty()){
            throw new ElectiveNotFoundException(String.format("Elective not found with id = %s",electiveId));
        }
        Elective elective = electiveOptional.get();
        AssociationKey key = new AssociationKey(student, elective);
        associationRepository.deleteById(key);
    }
}

