    // Exercicio 1
    const dobro:(v:number) => number = (n:number):number => 2*n;
    console.log(dobro(10));

    // Exercicio 2
    const dizerOla:(s:string | void)=>void = (nome:string | void = "Pessoa") => {console.log("Ola, " + nome)}; 
    dizerOla();
    dizerOla("Anna");
    
    // Exercicio 3
    let nums:number[] = [-3, 33, 38, 5];
    console.log(...nums);
    
    // Exercicio 4
    let array:number[] = [55, 20];     
    console.log(...array);
    
    // Exercicio 5
    let notas:number[] = [8.5, 6.3, 9.4]
    let [nota1,nota2,nota3] = notas;    
    console.log(nota1, nota2, nota3);
    
    // Exercicio 6
    let cientista:{primeiroNome:string, experiencia:number} = {primeiroNome: "Will", experiencia: 12};
    let {primeiroNome, experiencia} = cientista;    
    console.log(primeiroNome, experiencia)