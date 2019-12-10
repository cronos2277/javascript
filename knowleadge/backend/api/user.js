module.exports = app =>{
    const save = (req,res) =>{
        res.send("user save");
    }
    return {save}
}
/*
Aqui eh exportado o save com o nome para fora chamado save,
seria algo do tipo: return {save: save} E essa variavel app
tambem contem a estrutura do consign, uma vez que o mesmo eh
carregado na inicializacao.
*/