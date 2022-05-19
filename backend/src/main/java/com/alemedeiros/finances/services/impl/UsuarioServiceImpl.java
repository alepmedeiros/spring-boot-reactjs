package com.alemedeiros.finances.services.impl;

import java.util.Optional;

import com.alemedeiros.finances.exception.ErrorAutenticacao;
import com.alemedeiros.finances.exception.RegraNegocioException;
import com.alemedeiros.finances.model.entity.Usuario;
import com.alemedeiros.finances.model.repository.UsuarioRepository;
import com.alemedeiros.finances.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioServiceImpl implements UsuarioService{

    @Autowired
    private UsuarioRepository repository;

    public UsuarioServiceImpl(UsuarioRepository repository) {
        this.repository = repository;
    }
   
    @Override
    public Usuario autenticar(String email, String senha) {
        Optional<Usuario> usuario = repository.findByEmail(email);
        if (!usuario.isPresent()) {
            throw new ErrorAutenticacao("Usuário não encontrado para o email informado");
        }

        if (!usuario.get().getSenha().equals(senha)) {
            throw new ErrorAutenticacao("Senha inválida");
        }

        return usuario.get();
    }

    @Override
    @Transactional
    public Usuario salvarUsuario(Usuario usuario) {
        validaEmail(usuario.getEmail());
        return repository.save(usuario);
    }

    @Override
    public void validaEmail(String email) {
        boolean existe = repository.existsByEmail(email);
        if (existe) {
            throw new RegraNegocioException("Já existe um usuário cadastrado com este e-mail.");
        }
    }
    
}
