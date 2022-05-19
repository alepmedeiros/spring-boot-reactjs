package com.alemedeiros.finances.api.resource;

import java.util.List;
import java.util.Optional;

import com.alemedeiros.finances.api.dto.AtualizaStatusDTO;
import com.alemedeiros.finances.api.dto.LancamentoDTO;
import com.alemedeiros.finances.exception.RegraNegocioException;
import com.alemedeiros.finances.model.entity.Lancamentos;
import com.alemedeiros.finances.model.entity.Usuario;
import com.alemedeiros.finances.model.enums.StatusLancamento;
import com.alemedeiros.finances.model.enums.TipoLancamento;
import com.alemedeiros.finances.services.LancamentoService;
import com.alemedeiros.finances.services.UsuarioService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/v1/lancamentos")
@RequiredArgsConstructor
public class LancamentosResource {
    
    private final LancamentoService service;
    private final UsuarioService usuarioService;


    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody LancamentoDTO dto){
        try {
            Lancamentos entidade = converter(dto);
            entidade = service.salvar(entidade);
            return new ResponseEntity<>(entidade, HttpStatus.CREATED);
        } catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody LancamentoDTO dto) {
        return service.obterPorId(id).map(entity -> {
            try {
                    Lancamentos lancamentos = converter(dto);
                    lancamentos.setId(entity.getId());
                    service.atualizar(lancamentos);
                    return ResponseEntity.ok(lancamentos);    
            } catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }).orElseGet(() -> new ResponseEntity<>("Lançamento não encontrado na base", HttpStatus.BAD_REQUEST));
    }   

    @PutMapping("{id}/atualizar-status")
    public ResponseEntity<?> atualizarStatus(@PathVariable("id") Long id, @RequestBody AtualizaStatusDTO dto){
        return service.obterPorId(id).map(entity -> {
            StatusLancamento statusSelecionado = StatusLancamento.valueOf(dto.getStatus());

            if (statusSelecionado == null) {
                return ResponseEntity.badRequest().body("Não foi possivel atualizar o status do lançamento, envie um status valido");
            }

            try {
                entity.setStatus(statusSelecionado);
                service.atualizar(entity);
                return ResponseEntity.ok(entity);
            } catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
            
        }).orElseGet(() -> new ResponseEntity<>("Lançamento não encontrado na base", HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> apagar(@PathVariable("id") Long id) {
        return service.obterPorId(id).map(entidade -> {
            service.deletar(entidade);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }).orElseGet(() -> new ResponseEntity<>("Lançamento não encontrado na base de dados.", HttpStatus.BAD_REQUEST));
    }

    @GetMapping
    public ResponseEntity<?> buscar(
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "mes", required = false) Integer mes,
            @RequestParam(value = "ano", required = false) Integer ano,
            @RequestParam("usuario") Long idUsuario){
        Optional<Usuario> usuario = usuarioService.obterPorId(idUsuario);
        if (!usuario.isPresent()) {
            return ResponseEntity.badRequest().body("Não foi possivel realizar a consulta. Usuário não encontrado para o Id informado");
        }

        Lancamentos lancamentoFiltro = Lancamentos.builder()
                        .descricao(descricao)
                        .mes(mes)
                        .ano(ano)
                        .usuario(usuario.get())
                        .build();
        
        List<Lancamentos> lancamentos = service.buscar(lancamentoFiltro);
        return ResponseEntity.ok(lancamentos);
    }

    private Lancamentos converter(LancamentoDTO dto) {
        Usuario usuario = usuarioService.obterPorId(dto.getUsuario()).orElseThrow(
            () -> new RegraNegocioException("Usuário não encontrado para o Id informado."));

        Lancamentos lancamentos = new Lancamentos();
        lancamentos.setId(dto.getId());
        lancamentos.setDescricao(dto.getDescricao());
        lancamentos.setAno(dto.getAno());
        lancamentos.setMes(dto.getMes());
        lancamentos.setValor(dto.getValor());
        lancamentos.setUsuario(usuario);

        if (dto.getTipo() != null) {
            lancamentos.setTipo(TipoLancamento.valueOf(dto.getTipo()));
        }

        if (dto.getStatus() != null) {
            lancamentos.setStatus(StatusLancamento.valueOf(dto.getStatus()));
        }

        return lancamentos;
    }

}
