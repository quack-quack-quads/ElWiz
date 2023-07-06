package dev.quackquackquad.ElWizElectiveService.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.quackquackquad.ElWizElectiveService.controllers.StudentController;
import dev.quackquackquad.ElWizElectiveService.models.Elective;
import dev.quackquackquad.ElWizElectiveService.models.ElectiveStudentAssociation;
import dev.quackquackquad.ElWizElectiveService.models.Student;
import dev.quackquackquad.ElWizElectiveService.requests.AssociationRequest;
import dev.quackquackquad.ElWizElectiveService.services.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(controllers = StudentController.class)
@AutoConfigureMockMvc(addFilters = false) // disable any security filters
@ExtendWith(MockitoExtension.class)
public class StudentControllerTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private StudentService studentService;

    private Student student;

    @BeforeEach
    public void init() {
        this.student = Student.builder()
                .name("Rohit Shah").email("rohit1@gmail.com")
                .phoneNumber("9876543210")
                .build();
    }

    @Test
    public void StudentController_AddStudent_ReturnsStudent() throws Exception {
        when(studentService.addStudent(Mockito.any(Student.class))).thenReturn(student);

        ResultActions response = mockMvc.perform(post("/elective-service/student")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(student)));

        response.andExpect(MockMvcResultMatchers.jsonPath("$.name").value(student.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(student.getEmail()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phoneNumber").value(student.getPhoneNumber()))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void StudentController_GetAllStudents_ReturnsStudentList() throws Exception{
        when(studentService.getAllStudents()).thenReturn(List.of(student));

        ResultActions response = mockMvc.perform(get("/elective-service/student")
                .contentType("application/json"));

        response.andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value(student.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].email").value(student.getEmail()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].phoneNumber").value(student.getPhoneNumber()))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void StudentController_GetStudentById_ReturnsStudent() throws Exception{
        when(studentService.getStudentById(Mockito.any(String.class))).thenReturn((student));

        ResultActions response = mockMvc.perform(get("/elective-service/student/" + student.getEmail())
                .contentType("application/json"));

        response.andExpect(MockMvcResultMatchers.jsonPath("$.name").value(student.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(student.getEmail()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phoneNumber").value(student.getPhoneNumber()))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void StudentController_UpdateStudent_ReturnsStudent() throws Exception{
        Student newStudent = Student.builder()
                .name("Rohit L. Shah").email("rohit1@gmail.com")
                .phoneNumber("9876543214")
                .build();

        when(studentService.addStudent(Mockito.any(Student.class))).thenReturn(newStudent);

        ResultActions response = mockMvc.perform(put("/elective-service/student")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(newStudent)));

        response.andExpect(MockMvcResultMatchers.jsonPath("$.name").value(newStudent.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(newStudent.getEmail()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phoneNumber").value(newStudent.getPhoneNumber()))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void StudentController_AddElectiveById_ReturnsElectiveStudentAssociation() throws Exception {
        Elective elective = Elective.builder()
                .code("CS301")
                .name("Data Structures")
                .description("This course teaches about data structures")
                .build();

        ElectiveStudentAssociation electiveStudentAssociation = ElectiveStudentAssociation.builder()
                .student(student)
                .elective(elective)
                .build();

        AssociationRequest associationRequest = AssociationRequest.builder()
                .studentId(student.getEmail()).electiveId(elective.getCode())
                .joiningDate(new Date()).build();

        when(studentService.addElectiveById(Mockito.any(AssociationRequest.class))).thenReturn(electiveStudentAssociation);

        ResultActions response = mockMvc.perform(post("/elective-service/student/elective")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(associationRequest)));

        response
                .andExpect(MockMvcResultMatchers.jsonPath("$.student.name").value(student.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.student.email").value(student.getEmail()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.student.phoneNumber").value(student.getPhoneNumber()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.elective.code").value(elective.getCode()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.elective.name").value(elective.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.elective.description").value(elective.getDescription()))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void StudentController_GetElectivesByStudentId_ReturnsElectiveStudentAssociationList() throws Exception {
        Elective elective = Elective.builder()
                .code("CS301")
                .name("Data Structures")
                .description("This course teaches about data structures")
                .build();

        when(studentService.getElectiveByStudentId(Mockito.any(String.class))).thenReturn(List.of(elective));

        ResultActions response = mockMvc.perform(get("/elective-service/student/" + student.getEmail() + "/elective")
                .contentType("application/json"));

        response
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].code").value(elective.getCode()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value(elective.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].description").value(elective.getDescription()))
                .andDo(MockMvcResultHandlers.print());
    }
}