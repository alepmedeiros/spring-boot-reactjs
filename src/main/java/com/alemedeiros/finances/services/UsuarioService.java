package com.alemedeiros.finances.services;

import com.alemedeiros.finances.model.entity.Usuario;

public interface UsuarioService {
    Usuario autenticar(String email, String senha);
    Usuario salvarUsuario(Usuario usuario);
    void validaEmail(String email);
}
