package com.alemedeiros.finances.services;

import java.util.List;

import com.alemedeiros.finances.model.entity.Lancamentos;
import com.alemedeiros.finances.model.enums.StatusLancamento;

public interface LancamentoService {
    Lancamentos salvar(Lancamentos lancamentos);
    Lancamentos atualizar(Lancamentos lancamentos);
    void deletar(Lancamentos lancamentos);
    List<Lancamentos> buscar(Lancamentos lancamentosFiltro);
    void atualizarStatus(Lancamentos lancamentos, StatusLancamento status);
    void validar(Lancamentos lancamentos);
}
