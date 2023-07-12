package dev.quackquackquad.ElWizElectiveService.controllers;

import dev.quackquackquad.ElWizElectiveService.models.Elective;
import dev.quackquackquad.ElWizElectiveService.models.Student;
import dev.quackquackquad.ElWizElectiveService.services.ElectiveService;
import dev.quackquackquad.ElWizElectiveService.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/elective-service/elective")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ElectiveController {

    @Autowired
    private ElectiveService electiveService;

    @PostMapping
    public Elective addElective(@RequestBody Elective elective){
        return electiveService.addElective(elective);
    }

    @GetMapping
    public List<Elective> getAllElectives(){
        return electiveService.getAllElectives();
    }

    @GetMapping("/{id}")
    public Elective getElectiveById(@PathVariable String id){
        return electiveService.getElectiveById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteElectiveById(@PathVariable String id){
        electiveService.deleteElectiveById(id);
    }

    @PutMapping
    public Elective updateElective(@RequestBody Elective elective){
        return electiveService.addElective(elective);
    }

    @GetMapping("/{electiveId}/student")
    public List<Student> getStudentsByElectiveId(@PathVariable String electiveId){
        return electiveService.getStudentsByElectiveId(electiveId);
    }
}
