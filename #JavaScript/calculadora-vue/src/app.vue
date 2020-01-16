<template>
  <div id="app">
    <h1>Calculator</h1>
    <Calculator />
  </div> 
</template>
<script>
/* Se faz necessario registrar o componente da forma abaixo, 
  passando o componente para o atributo components, da Vue
  criada no Main.js, voce faz da seguinte forma:
  export default{
    components:{SeuComponente}
  }
  1st: Siga o padrao React para nome de componente, ou seja o mesmo que para classes.
  2nd: Apenas importe o que for usar, senao o vue da erro, se importar algo que nao se use.
*/
  import Calculator from "./main/Calculator";
  export default{
    components: { Calculator }
  }
</script>
<style>
@font-face {
    font-family: "RobotoMono";
    src: url("./fonts/RobotoMono-Thin.ttf");
}
* {
    font-family: "RobotoMono", monospace;
}
body {
    margin: 0;
}
#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    background: linear-gradient(to right, rgb(83, 105, 118), rgb(41, 46, 73));
}
</style>