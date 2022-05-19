package com.alemedeiros.finances.services.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

import com.alemedeiros.finances.exception.RegraNegocioException;
import com.alemedeiros.finances.model.entity.Lancamentos;
import com.alemedeiros.finances.model.enums.StatusLancamento;
import com.alemedeiros.finances.model.repository.LancamentoRepository;
import com.alemedeiros.finances.services.LancamentoService;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LancamentosServiceImpl implements LancamentoService{

    private LancamentoRepository repository;


    public LancamentosServiceImpl(LancamentoRepository repository) {
        this.repository = repository;
    }


    @Override
    @Transactional
    public Lancamentos salvar(Lancamentos lancamentos) {
        validar(lancamentos);
        return repository.save(lancamentos);
    }

    @Override
    @Transactional
    public Lancamentos atualizar(Lancamentos lancamentos) {
        Objects.requireNonNull(lancamentos.getId());
        validar(lancamentos);
        lancamentos.setStatus(StatusLancamento.PENDENTE);
        return repository.save(lancamentos);
    }

    @Override
    @Transactional
    public void deletar(Lancamentos lancamentos) {
        Objects.requireNonNull(lancamentos.getId());
        repository.delete(lancamentos);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Lancamentos> buscar(Lancamentos lancamentosFiltro) {
        Example example = Example.of(lancamentosFiltro, ExampleMatcher.matching()
                                                .withIgnoreCase()
                                                .withStringMatcher(StringMatcher.CONTAINING));
        return repository.findAll(example);
    }

    @Override
    public void atualizarStatus(Lancamentos lancamentos, StatusLancamento status) {
        lancamentos.setStatus(status);
        atualizar(lancamentos);
    }


    @Override
    public void validar(Lancamentos lancamentos) {
        if (lancamentos.getDescricao() == null || lancamentos.getDescricao().equals("")) {
            throw new RegraNegocioException("Informe uma descrição válida");
        }

        if(lancamentos.getMes() == null || lancamentos.getMes() < 1 || lancamentos.getMes() > 12) {
            throw new RegraNegocioException("Informe um Mês válido");
        }

        if(lancamentos.getAno() == null || lancamentos.getAno().toString().length() != 4) {
            throw new RegraNegocioException("Informe um Ano válido");
        }

        if(lancamentos.getUsuario() == null || lancamentos.getUsuario().getId() == null) {
            throw new RegraNegocioException("Informe um Usuário");
        }

        if(lancamentos.getValor() == null || lancamentos.getValor().compareTo(BigDecimal.ZERO) < 1) {
            throw new RegraNegocioException("Informe um Valor válido");
        }

        if(lancamentos.getTipo() == null) {
            throw new RegraNegocioException("Informe um tipo de Lançamento");
        }
    }
    
}
