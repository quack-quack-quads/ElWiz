package dev.quackquackquad.ElWizElectiveService.controllers;

import dev.quackquackquad.ElWizElectiveService.models.Elective;
import dev.quackquackquad.ElWizElectiveService.models.ElectiveStudentAssociation;
import dev.quackquackquad.ElWizElectiveService.models.Student;
import dev.quackquackquad.ElWizElectiveService.requests.AssociationRequest;
import dev.quackquackquad.ElWizElectiveService.requests.DissociationRequest;
import dev.quackquackquad.ElWizElectiveService.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/elective-service/student")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping
    public Student addStudent(@RequestBody Student student){
        return studentService.addStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id){
        return studentService.getStudentById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteStudentById(@PathVariable String id){
        studentService.deleteStudentById(id);
    }

    @PutMapping
    public Student updateStudent(@RequestBody Student student){
        return studentService.addStudent(student);
    }

    @PostMapping("/elective")
    public ElectiveStudentAssociation addElectiveById(@RequestBody AssociationRequest request){
        return studentService.addElectiveById(request);
    }

    @DeleteMapping("/elective")
    public void removeElectiveById(@RequestBody DissociationRequest request){
        studentService.removeElective(request.getStudentId(), request.getElectiveId());
    }

    @GetMapping("/{studentId}/elective")
    public List<Elective> getElectivesByStudentId(@PathVariable String studentId){
        return studentService.getElectiveByStudentId(studentId);
    }
}

