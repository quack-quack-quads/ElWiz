package dev.quackquackquad.ElWizElectiveService.service;

import dev.quackquackquad.ElWizElectiveService.models.Elective;
import dev.quackquackquad.ElWizElectiveService.repositories.ElectiveRepository;
import dev.quackquackquad.ElWizElectiveService.services.ElectiveService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ElectiveServiceTests {
    @Mock
    private ElectiveRepository electiveRepository;

    @InjectMocks
    private ElectiveService electiveService;

    private Elective elective;

    @BeforeEach
    public void init() {
        this.elective = Elective.builder()
                .code("CS301").name("Programming-2")
                .description("This course is meant to introduce students to programming in Java and C++ and help them understand OOP concept.")
                .build();
    }

    @Test
    public void ElectiveService_AddElective_ReturnsElective() {
        when(electiveRepository.save(Mockito.any(Elective.class))).thenReturn(elective);

        Elective savedElective = electiveService.addElective(elective);

        Assertions.assertThat(savedElective).isNotNull();
        Assertions.assertThat(savedElective.getCode()).isEqualTo(elective.getCode());
        Assertions.assertThat(savedElective.getName()).isEqualTo(elective.getName());
        Assertions.assertThat(savedElective.getDescription()).isEqualTo(elective.getDescription());
    }

    @Test
    public void ElectiveService_GetAllElectives_ReturnsElectiveList() {
        when(electiveRepository.findAll()).thenReturn(List.of(elective));

        List<Elective> electiveList = electiveService.getAllElectives();

        Assertions.assertThat(electiveList).isNotNull();
        Assertions.assertThat(electiveList.size()).isEqualTo(1);
        Assertions.assertThat(electiveList.get(0).getCode()).isEqualTo(elective.getCode());
        Assertions.assertThat(electiveList.get(0).getName()).isEqualTo(elective.getName());
        Assertions.assertThat(electiveList.get(0).getDescription()).isEqualTo(elective.getDescription());
    }

    @Test
    public void ElectiveService_GetElectiveById_ReturnsElective() {
        when(electiveRepository.findById(Mockito.any(String.class))).thenReturn(Optional.ofNullable(elective));

        Elective electiveById = electiveService.getElectiveById(elective.getCode());

        Assertions.assertThat(electiveById).isNotNull();
        Assertions.assertThat(electiveById.getCode()).isEqualTo(elective.getCode());
        Assertions.assertThat(electiveById.getName()).isEqualTo(elective.getName());
        Assertions.assertThat(electiveById.getDescription()).isEqualTo(elective.getDescription());
    }
}