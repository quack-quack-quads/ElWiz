package dev.quackquackquad.ElWizElectiveService.services;

import dev.quackquackquad.ElWizElectiveService.exceptions.ElectiveNotFoundException;
import dev.quackquackquad.ElWizElectiveService.models.Elective;
import dev.quackquackquad.ElWizElectiveService.models.Student;
import dev.quackquackquad.ElWizElectiveService.repositories.ElectiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ElectiveService {
    @Autowired
    private ElectiveRepository electiveRepository;
    public Elective addElective(Elective elective){
        return electiveRepository.save(elective);
    }

    public List<Elective> getAllElectives(){
        return electiveRepository.findAll();
    }

    public Elective getElectiveById(String id) {
        Optional<Elective> elective = electiveRepository.findById(id);
        if(elective.isEmpty()){
            throw new ElectiveNotFoundException(String.format("Elective not found with id = %s", id));
        }
        return elective.get();
    }

    public void deleteElectiveById(String id){
        electiveRepository.deleteById(id);
    }
}
