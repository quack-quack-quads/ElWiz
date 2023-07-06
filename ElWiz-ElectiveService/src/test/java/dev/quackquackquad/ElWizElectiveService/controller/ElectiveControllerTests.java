package dev.quackquackquad.ElWizElectiveService.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.quackquackquad.ElWizElectiveService.controllers.ElectiveController;
import dev.quackquackquad.ElWizElectiveService.models.Elective;
import dev.quackquackquad.ElWizElectiveService.services.ElectiveService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(controllers = ElectiveController.class)
@AutoConfigureMockMvc(addFilters = false) // disable any security filters
@ExtendWith(MockitoExtension.class) // use Mockito to mock any dependencies
public class ElectiveControllerTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
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
    public void ElectiveController_AddElective_ReturnsElective() throws Exception {
        when(electiveService.addElective(Mockito.any(Elective.class))).thenReturn(elective);

        ResultActions response = mockMvc.perform(post("/elective-service/elective")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(elective)));

        response.andExpect(MockMvcResultMatchers.jsonPath("$.code").value(elective.getCode()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(elective.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(elective.getDescription()))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void ElectiveController_GetElective_ReturnsElectiveList() throws Exception {
        when(electiveService.getAllElectives()).thenReturn(List.of(elective));

        ResultActions response = mockMvc.perform(get("/elective-service/elective")
                .contentType(MediaType.APPLICATION_JSON));

        response
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].code").value(elective.getCode()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value(elective.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].description").value(elective.getDescription()))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void ElectiveController_GetElectiveById_ReturnsElective() throws Exception {
        when(electiveService.getElectiveById(Mockito.any(String.class))).thenReturn(elective);

        ResultActions response = mockMvc.perform(get("/elective-service/elective/" + elective.getCode())
                .contentType(MediaType.APPLICATION_JSON));

        response
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(elective.getCode()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(elective.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(elective.getDescription()))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void ElectiveController_DeleteElectiveById_ReturnsVoid() throws Exception {
        ResultActions response = mockMvc.perform(get("/elective-service/elective/" + elective.getCode())
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void ElectiveController_UpdateElective_ReturnsElective() throws Exception {
        Elective newElective = Elective.builder()
                .code(elective.getCode())
                .name("Data Structures & Algorithms")
                .description("This course is meant to introduce students to data structures and algorithms.")
                .build();

        when(electiveService.addElective(Mockito.any(Elective.class))).thenReturn(newElective);

        ResultActions response = mockMvc.perform(put("/elective-service/elective")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newElective)));

        response.andExpect(MockMvcResultMatchers.jsonPath("$.code").value(newElective.getCode()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(newElective.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(newElective.getDescription()))
                .andDo(MockMvcResultHandlers.print());
    }
}
