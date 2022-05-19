package com.alemedeiros.finances.model.repository;

import com.alemedeiros.finances.model.entity.Lancamentos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamentos, Long>{
    
}
