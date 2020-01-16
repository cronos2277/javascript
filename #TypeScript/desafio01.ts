let funcionario: {
    supervisores:string[],
    ponto:(hora:number)=>string
};

funcionario.ponto = function (hora):string{
    return (hora <=8 )?"Ponto Normal":"Fora do horario";
};

funcionario.supervisores = ['ana','Fernando'];


