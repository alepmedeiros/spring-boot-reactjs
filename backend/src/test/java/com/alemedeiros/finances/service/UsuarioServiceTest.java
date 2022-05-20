package com.alemedeiros.finances.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Optional;

import com.alemedeiros.finances.exception.ErrorAutenticacao;
import com.alemedeiros.finances.exception.RegraNegocioException;
import com.alemedeiros.finances.model.entity.Usuario;
import com.alemedeiros.finances.model.repository.UsuarioRepository;
import com.alemedeiros.finances.services.impl.UsuarioServiceImpl;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class UsuarioServiceTest {
    
    @SpyBean
    UsuarioServiceImpl service;

    @MockBean
    UsuarioRepository repository;

    @Test
    void deveValidarEmail(){
        //cenario
       
        Mockito.when(repository.existsByEmail(Mockito.anyString())).thenReturn(false);

        //acao
        //verificacao
        service.validaEmail("email@email.com");
    }

    @Test
    void deveLancarErroAiValidarEmailQuandoExistirEmailCadastrado(){
        //cenario
        Mockito.when(repository.existsByEmail(Mockito.anyString())).thenReturn(true);
        
        //acao 
        //verificacao
        Exception exception = assertThrows(RegraNegocioException.class, 
        () -> service.validaEmail("email@email.com"));
        assertEquals("Já existe um usuário cadastrado com este e-mail.", exception.getMessage()); 
    }

    @Test
    void deveAutenticarUmUsuarioComSucesso(){
        //cenario
        String email = "email@email.com";
        String senha = "senha";

        Usuario usuario = Usuario.builder().email(email).senha(senha).build();
        Mockito.when(repository.findByEmail(email)).thenReturn(Optional.of(usuario));
        
        //acao
        Usuario resultado = service.autenticar(email, senha);

        //verificao
        Assertions.assertThat(resultado).isNotNull();
    }

    @Test
    void deveLancarErroQuandoEncontrarUsuarioCadastradoComOEmailInformado(){
        //cenario
        Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());

        //acao
        Exception exception = assertThrows(ErrorAutenticacao.class, 
            () -> service.autenticar("email@email.com", "senha"));

        //verificacao
        assertEquals("Usuário não encontrado para o email informado", exception.getMessage());
    }

    @Test
    void deveLancarErrroQuandoSenhaNaoBater(){
        //cenario
        String senha = "senha";
        Usuario usuario = Usuario.builder().email("email@email.com").senha(senha).build();
        Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(usuario));

        //acao
        Exception exception = assertThrows(ErrorAutenticacao.class, 
            () -> service.autenticar("email@email.com", "123"));

        //verificacao
        assertEquals("Senha inválida", exception.getMessage());
    }

    @Test
    void deveSalvarUmUsuario(){
        //cenario
        Mockito.doNothing().when(service).validaEmail(Mockito.anyString());
        Usuario usuario = Usuario.builder()
                            .id(1l)
                            .nome("nome")
                            .email("email@email.com")
                            .senha("senha").build();

        Mockito.when(repository.save(Mockito.any(Usuario.class))).thenReturn(usuario);

        //acao
        Usuario usuarioSalvo = service.salvarUsuario(new Usuario());

        //verificacao
        Assertions.assertThat(usuarioSalvo).isNotNull();
        Assertions.assertThat(usuarioSalvo.getId()).isEqualTo(1l);
        Assertions.assertThat(usuarioSalvo.getNome()).isEqualTo("nome");
        Assertions.assertThat(usuarioSalvo.getEmail()).isEqualTo("email@email.com");
        Assertions.assertThat(usuarioSalvo.getSenha()).isEqualTo("senha");
    }

    @Test
    void naoDeveSalvarUsuarioComEmailCadastrado(){
        //cenario
        String email = "email@email.com";
        Usuario usuario = Usuario.builder().email(email).build();
        Mockito.doThrow(RegraNegocioException.class).when(service).validaEmail(email);
        
        //acao
        Exception exception = assertThrows(RegraNegocioException.class, 
            () -> service.salvarUsuario(usuario));
        
        //verificacao
        Assertions.assertThat(exception.getMessage()).isNull();
        // Mockito.verify(repository, Mockito.never()).save(usuario);
    }
}
