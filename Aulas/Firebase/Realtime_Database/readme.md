# Realtime Database

## Instalando o Firebase Realtime Database
>O Firebase Realtime Database é um banco de dados NoSQL na nuvem que possibilita a sincronização de dados em tempo real no formato JSON.

![RT1](.img/rt_1_inicio.png)

### Configurar banco de dados

#### Opções de banco de dados
**Ao clicar no botão `criar banco de dados`, pelo menos por hora, você verá uma tela como essa abaixo, aonde você deve definir, em qual servidor ficará a aplicação.**

![RT2](.img/rt_2_local.png)

#### Regras de segurança
<div style="display:inline-block;width:100%">
    <div style="display:inline;width:50%;float:left">
        <img src="./.img/rt_3_regras.png"/>
        <p><b>O modo bloqueado é o modo padrão e recomendado para ambientes de produção, e obviamente recomendado</b></p>
    </div>
    <br>
    <div style="display:inline;width:50%;float:right">
        <img src="./.img/rt_3_regras_alternativo.png"/>
        <p><b>Nesse modo tanto a escrita como a leitura está liberado, não recomendado para ambiente de produção, mas útil em ambiente de desenvolvimento.</b></p>
    </div>    
</div>


#### Uma vez criado você verá uma tela como essa abaixo:

![RT4](.img/rt_4_dados.png)

**Naqueles três pontinhos a direita, você tem um menu parecido com esse abaixo, como você pode perceber é possível importar arquivos do tipo JSON para cá, e para fazer backups automático, você precisa pagar por uma assinatura, pelo menos a mais básica.**

![RT5](.img/rt_5_dados_menu.png)

**Existe a opção de habilitar, as legenda para ter um melhor feedback visual dos dados.**

![RT6](.img/rt_6_dados_legenda.png)

**Dessa forma abaixo, você pode adicionar coleções manualmente.**

![RT7](.img/rt_7_dados_child.png)

### Adicionando Childs

<div style="display:inline-block;width:100%">
    <div style="display:inline;width:50%;float:left">
        <img src="./.img/rt_8_dados_empty_child.png"/>
        <p><b>Quando você adiciona um campo sem valor, ele se torna um objeto, conforme ilustrado na imagem.</b></p>
    </div>
    <br>
    <div style="display:inline;width:50%;float:right">
        <img src="./.img/rt_9_dados_child_17.png"/>
        <p><b>Porém quando você adiciona valor o campo passa a ser de um tipo primitivo.</b></p>
    </div>    
</div>


### E ao clicar em adicionar você tem:

![RTA](.img/rt_A_dados_other.png)