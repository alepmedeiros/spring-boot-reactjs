package com.alemedeiros.finances.resource;

import com.alemedeiros.finances.api.dto.UsuarioDTO;
import com.alemedeiros.finances.api.resource.UsuarioResource;
import com.alemedeiros.finances.exception.ErrorAutenticacao;
import com.alemedeiros.finances.exception.RegraNegocioException;
import com.alemedeiros.finances.model.entity.Usuario;
import com.alemedeiros.finances.services.LancamentoService;
import com.alemedeiros.finances.services.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@ActiveProfiles("test")
@WebMvcTest(controllers = UsuarioResource.class)
@AutoConfigureMockMvc
public class UsuarioResourceTest {
    
    static final String API = "/v1/usuarios";
    static final MediaType JSON = MediaType.APPLICATION_JSON;

    @Autowired
    MockMvc mvc;

    @MockBean
    UsuarioService service;

    @MockBean
    LancamentoService lancamentoService;

    @Test
    void deveAutenticarUmUsuario() throws Exception {
        //cenario
        String email = "email@email.com";
        String senha = "senha";

        UsuarioDTO usuarioDTO = UsuarioDTO.builder()
                    .email(email)
                    .senha(senha)    
                    .build();

        Usuario usuario = Usuario.builder()
                    .id(1l)
                    .email(email)
                    .senha(senha)
                    .build(); 

        Mockito.when(service.autenticar(email, senha)).thenReturn(usuario);

        String json = new ObjectMapper().writeValueAsString(usuarioDTO);

        //execucao
        //verificacao
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                                                .post(API.concat("/autenticar"))
                                                .accept(JSON)
                                                .contentType(JSON)
                                                .content(json);
        mvc.perform(request)
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("id").value(usuario.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("nome").value(usuario.getNome()))
            .andExpect(MockMvcResultMatchers.jsonPath("email").value(usuario.getEmail()));
    }

    @Test
    void deveObterErrroNaAutenticacao() throws Exception {
        //cenario
        String email = "email@email.com";
        String senha = "senha";

        UsuarioDTO usuarioDTO = UsuarioDTO.builder()
                    .email(email)
                    .senha(senha)    
                    .build();

        Mockito.when(service.autenticar(email, senha)).thenThrow(ErrorAutenticacao.class);

        String json = new ObjectMapper().writeValueAsString(usuarioDTO);

        //execucao
        //verificacao
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                                                .post(API.concat("/autenticar"))
                                                .accept(JSON)
                                                .contentType(JSON)
                                                .content(json);
        mvc.perform(request)
            .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void deveCriarNovoUsuario() throws Exception {
        //cenario
        String email = "email@email.com";
        String senha = "senha";

        UsuarioDTO usuarioDTO = UsuarioDTO.builder()
                    .email(email)
                    .senha(senha)    
                    .build();

        Usuario usuario = Usuario.builder()
                    .id(1l)
                    .email(email)
                    .senha(senha)
                    .build(); 

        Mockito.when(service.salvarUsuario(Mockito.any(Usuario.class))).thenReturn(usuario);

        String json = new ObjectMapper().writeValueAsString(usuarioDTO);

        //execucao
        //verificacao
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                                                .post(API)
                                                .accept(JSON)
                                                .contentType(JSON)
                                                .content(json);
        mvc.perform(request)
            .andExpect(MockMvcResultMatchers.status().isCreated())
            .andExpect(MockMvcResultMatchers.jsonPath("id").value(usuario.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("nome").value(usuario.getNome()))
            .andExpect(MockMvcResultMatchers.jsonPath("email").value(usuario.getEmail()));
    }

    @Test
    void deveRetornarErroAoCriarNovoUsuario() throws Exception {
        //cenario
        String email = "email@email.com";
        String senha = "senha";

        UsuarioDTO usuarioDTO = UsuarioDTO.builder()
                    .email(email)
                    .senha(senha)    
                    .build(); 

        Mockito.when(service.salvarUsuario(Mockito.any(Usuario.class))).thenThrow(RegraNegocioException.class);

        String json = new ObjectMapper().writeValueAsString(usuarioDTO);

        //execucao
        //verificacao
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                                                .post(API)
                                                .accept(JSON)
                                                .contentType(JSON)
                                                .content(json);
        mvc.perform(request)
            .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
