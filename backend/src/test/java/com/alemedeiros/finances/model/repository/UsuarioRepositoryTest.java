package com.alemedeiros.finances.model.repository;

import java.util.Optional;

import com.alemedeiros.finances.model.entity.Usuario;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class UsuarioRepositoryTest {
    
    @Autowired
    UsuarioRepository repository;

    @Autowired
    TestEntityManager entityManager;

    @Test
    public void deveVerificarAExistenciaDeUmEmail(){
        //cenario
        Usuario usuario = criarUsuario();
        entityManager.persist(usuario);

        //acao / execucao
        boolean resultado = repository.existsByEmail("usuario@email.com");

        //verificacao
        Assertions.assertThat(resultado).isTrue();
    }

    @Test
    void deveRetornarFalsoQuandoNaoHouverUsuarioCadastradoComOEmail(){
        //cenario
        // repository.deleteAll();

        //acao / execucao
        boolean resultado = repository.existsByEmail("usuario@email.com");

        // verificacao
        Assertions.assertThat(resultado).isFalse();
    }

    @Test
    void devePersistirUmUsuarioNaBaseDeDados(){
        //cenario
        Usuario usuario = criarUsuario();

        //acao
        Usuario usuarioSalvo = repository.save(usuario);

        //verificacao
        Assertions.assertThat(usuarioSalvo.getId()).isNotNull();;
    }

    @Test
    void deveBuscarUmUsuarioPorEmail(){
        Usuario usuario = criarUsuario();
        entityManager.persist(usuario); 
        Optional<Usuario> resultado = repository.findByEmail("email@email.com");
        Assertions.assertThat(resultado.isPresent()).isTrue();
    }

    @Test
    void deveRetornarVAzioAoBuscarUmUsuarioPorEmailQuandoNaoExisteNaBase(){
        Optional<Usuario> resultado = repository.findByEmail("email@email.com");
        Assertions.assertThat(resultado.isPresent()).isFalse();
    }

    private static Usuario criarUsuario() {
        Usuario usuario = Usuario.builder()
                            .nome("usuario")
                            .senha("senha")
                            .email("email@email.com")
                            .build();
        return usuario;
    }
}
