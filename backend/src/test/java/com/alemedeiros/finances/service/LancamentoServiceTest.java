package com.alemedeiros.finances.service;

import com.alemedeiros.finances.exception.RegraNegocioException;
import com.alemedeiros.finances.model.entity.Lancamentos;
import com.alemedeiros.finances.model.entity.Usuario;
import com.alemedeiros.finances.model.enums.StatusLancamento;
import com.alemedeiros.finances.model.repository.LancamentoRepository;
import com.alemedeiros.finances.model.repository.LancamentoRepositoryTest;
import com.alemedeiros.finances.services.impl.LancamentosServiceImpl;

import static org.assertj.core.api.Assertions.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.data.domain.Example;
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

    @Test
    void naoDeveSalvarUmLancamentoQuandoHouverErroDeValidacao(){
        //cenario
        Lancamentos lancamentoSalvar = LancamentoRepositoryTest.criarLancamento();
        Mockito.doThrow(RegraNegocioException.class).when(service).validar(lancamentoSalvar);

        //execucao 
        //verificacao
        catchThrowableOfType(() -> service.salvar(lancamentoSalvar), RegraNegocioException.class);
        Mockito.verify(repository, Mockito.never()).save(lancamentoSalvar);
    }

    @Test
    void deveAtualizarUmLancamento(){
        //cenario
        Lancamentos lancamentoSalvo = LancamentoRepositoryTest.criarLancamento();
        lancamentoSalvo.setId(1l);
        lancamentoSalvo.setStatus(StatusLancamento.PENDENTE);

        Mockito.doNothing().when(service).validar(lancamentoSalvo);

        Mockito.when(repository.save(lancamentoSalvo)).thenReturn(lancamentoSalvo);

        //execucao
        service.atualizar(lancamentoSalvo);

        //verificacao
        Mockito.verify(repository, Mockito.times(1)).save(lancamentoSalvo);
    }

    @Test
    void deveLancarErroAoAtualiziarLancamentoInexistente(){
        //cenario
        Lancamentos lancamento = LancamentoRepositoryTest.criarLancamento();
      
        //execucao 
        //verificacao
        catchThrowableOfType(() -> service.atualizar(lancamento), NullPointerException.class);
        Mockito.verify(repository, Mockito.never()).save(lancamento);
    }

    @Test
    void deveApagarLancamento(){
        //cenario
        Lancamentos lancamento = LancamentoRepositoryTest.criarLancamento();
        lancamento.setId(1l);

        //execucao
        service.deletar(lancamento);

        //verificacao
        Mockito.verify(repository).delete(lancamento);
    }

    @Test
    void deveLancarErroAoApagarLancamentoInexistente(){
        //cenario
        Lancamentos lancamento = LancamentoRepositoryTest.criarLancamento();

        //execucao
        catchThrowableOfType(() -> service.deletar(lancamento), NullPointerException.class);

        //verificacao
        Mockito.verify(repository, Mockito.never()).delete(lancamento);
    }

    @Test
    void deveFiltrarLancamentos(){
        //cenario
        Lancamentos lancamento = LancamentoRepositoryTest.criarLancamento();
        lancamento.setId(1l);

        List<Lancamentos> lista = Arrays.asList(lancamento);
        Mockito.when(repository.findAll(Mockito.any(Example.class))).thenReturn(lista);

        //execucao
        List<Lancamentos> resultado = service.buscar(lancamento);

        //verificacao
        assertThat(resultado).isNotEmpty().hasSize(1).contains(lancamento);

    }

    @Test
    void deveAtualizarStatusLancamento(){
        //cenario
        Lancamentos lancamento = LancamentoRepositoryTest.criarLancamento();
        lancamento.setId(1l);

        StatusLancamento novoStatus = StatusLancamento.EFETIVADO;
        Mockito.doReturn(lancamento).when(service).atualizar(lancamento);

        //execucao
        service.atualizarStatus(lancamento, novoStatus);

        //verificacao
        assertThat(lancamento.getStatus()).isEqualTo(novoStatus);
        Mockito.verify(service).atualizar(lancamento);
    }

    @Test
    void deveObterLancamentoPorId(){
        //cenario
        Long id = 1l;

        Lancamentos lancamento = LancamentoRepositoryTest.criarLancamento();
        lancamento.setId(id);
        
        Mockito.when(repository.findById(id)).thenReturn(Optional.of(lancamento));

        //execucao
        Optional<Lancamentos> resultado = service.obterPorId(id);

        //verificacao
        assertThat(resultado.isPresent()).isTrue();
    }

    @Test
    void deveRetornarVazio(){
        //cenario
        Long id = 1l;

        Lancamentos lancamento = LancamentoRepositoryTest.criarLancamento();
        lancamento.setId(id);
        
        Mockito.when(repository.findById(id)).thenReturn(Optional.empty());

        //execucao
        Optional<Lancamentos> resultado = service.obterPorId(id);

        //verificacao
        assertThat(resultado.isPresent()).isFalse();
    }

    @Test
    void deveLancarErrosAoValidarLancamento(){
        Lancamentos lancamento = new Lancamentos();

        Throwable error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe uma descrição válida");

        lancamento.setDescricao("");

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe uma descrição válida");

        lancamento.setDescricao("descricao");

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um Mês válido");

        lancamento.setMes(0);

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um Mês válido");

        lancamento.setMes(13);

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um Mês válido");

        lancamento.setMes(1);

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um Ano válido");

        lancamento.setAno(22);

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um Ano válido");

        lancamento.setAno(2022);

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um Usuário");
        
        lancamento.setUsuario(new Usuario());

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um Usuário");
        
        lancamento.getUsuario().setId(1l);

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um Valor válido");

        lancamento.setValor(BigDecimal.ZERO);

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um Valor válido");

        lancamento.setValor(BigDecimal.valueOf(1));

        error = catchThrowable(() -> service.validar(lancamento));
        assertThat(error).isInstanceOf(RegraNegocioException.class).hasMessage("Informe um tipo de Lançamento");

    } 
}
