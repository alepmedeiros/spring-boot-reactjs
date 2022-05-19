package com.alemedeiros.finances.model.repository;

import java.util.Optional;

import com.alemedeiros.finances.model.entity.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    boolean existsByEmail(String email);
    Optional<Usuario> findByEmail(String email);
}
