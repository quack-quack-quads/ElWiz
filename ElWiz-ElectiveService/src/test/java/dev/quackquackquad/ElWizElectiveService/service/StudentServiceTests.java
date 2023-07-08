package dev.quackquackquad.ElWizElectiveService.service;

import dev.quackquackquad.ElWizElectiveService.models.Elective;
import dev.quackquackquad.ElWizElectiveService.models.ElectiveStudentAssociation;
import dev.quackquackquad.ElWizElectiveService.models.Student;
import dev.quackquackquad.ElWizElectiveService.repositories.ElectiveRepository;
import dev.quackquackquad.ElWizElectiveService.repositories.ElectiveStudentAssociationRepository;
import dev.quackquackquad.ElWizElectiveService.repositories.StudentRepository;
import dev.quackquackquad.ElWizElectiveService.requests.AssociationRequest;
import dev.quackquackquad.ElWizElectiveService.services.StudentService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class StudentServiceTests {
    @Mock
    private StudentRepository studentRepository;
    @Mock
    private ElectiveRepository electiveRepository;
    @Mock
    private ElectiveStudentAssociationRepository associationRepository;

    @InjectMocks
    private StudentService studentService;

    private Elective elective;
    private Student student;

    @BeforeEach
    public void init() {
        this.elective = Elective.builder()
                .code("CS301").name("Programming-2")
                .description("This course is meant to introduce students to programming in Java and C++ and help them understand OOP concept.")
                .build();
        this.student = Student.builder()
                .name("Rohit Shah").email("rohit1@gmail.com")
                .phoneNumber("9876543210")
                .build();
    }

    @Test
    public void StudentService_AddStudent_ReturnsStudent() {
        when(studentRepository.save(student)).thenReturn(student);

        Student savedStudent = studentService.addStudent(student);

        Assertions.assertThat(savedStudent).isNotNull();
        Assertions.assertThat(savedStudent.getName()).isEqualTo(student.getName());
        Assertions.assertThat(savedStudent.getEmail()).isEqualTo(student.getEmail());
        Assertions.assertThat(savedStudent.getPhoneNumber()).isEqualTo(student.getPhoneNumber());
    }

    @Test
    public void StudentService_GetAllStudents_ReturnsStudentList() {
        when(studentRepository.findAll()).thenReturn(List.of(student));

        List<Student> studentList = studentService.getAllStudents();

        Assertions.assertThat(studentList).isNotNull();
        Assertions.assertThat(studentList.size()).isEqualTo(1);
        Assertions.assertThat(studentList.get(0).getName()).isEqualTo(student.getName());
        Assertions.assertThat(studentList.get(0).getEmail()).isEqualTo(student.getEmail());
        Assertions.assertThat(studentList.get(0).getPhoneNumber()).isEqualTo(student.getPhoneNumber());
    }

    @Test
    public void StudentService_GetStudentById_ReturnsStudent() {
        when(studentRepository.findById(student.getEmail())).thenReturn(Optional.ofNullable(student));

        Student foundStudent = studentService.getStudentById(student.getEmail());

        Assertions.assertThat(foundStudent).isNotNull();
        Assertions.assertThat(foundStudent.getName()).isEqualTo(student.getName());
        Assertions.assertThat(foundStudent.getEmail()).isEqualTo(student.getEmail());
        Assertions.assertThat(foundStudent.getPhoneNumber()).isEqualTo(student.getPhoneNumber());
    }

    @Test
    public void StudentService_AddElectiveById_ReturnsElectiveStudentAssociation() {
        AssociationRequest associationRequest = AssociationRequest.builder()
                .studentId(student.getEmail())
                .electiveId(elective.getCode())
                .joiningDate(new Date())
                .build();

        when(studentRepository.findById(student.getEmail())).thenReturn(java.util.Optional.ofNullable(student));
        when(electiveRepository.findById(elective.getCode())).thenReturn(java.util.Optional.ofNullable(elective));
        when(associationRepository.save(Mockito.any(ElectiveStudentAssociation.class))).thenAnswer(i -> i.getArguments()[0]);

        ElectiveStudentAssociation association = studentService.addElectiveById(associationRequest);

        Assertions.assertThat(association).isNotNull();
        Assertions.assertThat(association.getStudent()).isEqualTo(student);
        Assertions.assertThat(association.getElective()).isEqualTo(elective);
    }

    @Test
    public void StudentService_GetElectiveByStudentId_ReturnsElectiveList() {
        Student studentWithAssociations = this.student;
        studentWithAssociations.setAssociations(List.of(ElectiveStudentAssociation.builder()
                .student(student)
                .elective(elective)
                .joiningDate(new Date())
                .build()));

        when(studentRepository.findById(student.getEmail())).thenReturn(Optional.ofNullable(studentWithAssociations));

        List<Elective> electiveList = studentService.getElectiveByStudentId(student.getEmail());

        Assertions.assertThat(electiveList).isNotNull();
        Assertions.assertThat(electiveList.size()).isEqualTo(1);
        Assertions.assertThat(electiveList.get(0).getCode()).isEqualTo(elective.getCode());
        Assertions.assertThat(electiveList.get(0).getName()).isEqualTo(elective.getName());
        Assertions.assertThat(electiveList.get(0).getDescription()).isEqualTo(elective.getDescription());
    }

    @Test
    public void StudentService_RemoveElective_ReturnsVoid() {
        when(studentRepository.findById(student.getEmail())).thenReturn(Optional.ofNullable(student));
        when(electiveRepository.findById(elective.getCode())).thenReturn(Optional.ofNullable(elective));

        assertAll(() -> studentService.removeElective(student.getEmail(), elective.getCode()));
    }
}