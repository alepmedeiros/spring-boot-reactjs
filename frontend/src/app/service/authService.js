import LocalStorageservice from "./localStorageService";

export const USUARIO_LOGADO = 'usuario_logado';

export default class AuthService {
    
    static isUsuarioAutenticado(){
        const usuario = LocalStorageservice.obtemItem(USUARIO_LOGADO);
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        LocalStorageservice.removerItem(USUARIO_LOGADO);
    }

    static logar(usuario){
        LocalStorageservice.addItem(USUARIO_LOGADO, usuario);
    }

   static obterUsuarioAutenticado() {
       return LocalStorageservice.obtemItem(USUARIO_LOGADO);
   }
}