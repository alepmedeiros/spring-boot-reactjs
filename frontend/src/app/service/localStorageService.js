export default class LocalStorageservice {
    
    static addItem(chave, valor){
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    static obtemItem(chave){
        return JSON.parse(localStorage.getItem(chave));
    }

    static removerItem(chave){
        localStorage.removeItem(chave);
    }
}