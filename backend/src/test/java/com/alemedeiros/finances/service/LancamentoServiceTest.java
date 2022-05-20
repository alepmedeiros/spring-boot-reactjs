package com.alemedeiros.finances.service;

import com.alemedeiros.finances.model.entity.Lancamentos;
import com.alemedeiros.finances.model.enums.StatusLancamento;
import com.alemedeiros.finances.model.repository.LancamentoRepository;
import com.alemedeiros.finances.model.repository.LancamentoRepositoryTest;
import com.alemedeiros.finances.services.impl.LancamentosServiceImpl;

import static org.assertj.core.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class LancamentoServiceTest {
    
    @SpyBean
    LancamentosServiceImpl service;

    @MockBean
    LancamentoRepository repository;

    @Test
    void deveSalvarUmLancamento(){

    }

    @Test
    void naoDeveSalvarUmLancamentoQuandoHouverErroDeValidacao(){
        //cenario
        Lancamentos lancamentoSalvar = LancamentoRepositoryTest.criarLancamento();
        Mockito.doNothing().when(service).validar(lancamentoSalvar);

        Lancamentos lancamentoSalvo = LancamentoRepositoryTest.criarLancamento();
        lancamentoSalvo.setId(1l);
        lancamentoSalvo.setStatus(StatusLancamento.PENDENTE);
        Mockito.when(repository.save(lancamentoSalvar)).thenReturn(lancamentoSalvo);

        //execucao
        Lancamentos lancamento = service.salvar(lancamentoSalvar);

        //verificacao
        assertThat(lancamento.getId()).isEqualTo(lancamentoSalvo.getId());
        assertThat(lancamento.getStatus()).isEqualTo(StatusLancamento.PENDENTE);
    }
}
