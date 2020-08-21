// Este arquivo pode ser substituído durante a construção usando o array `fileReplacements`.
// ng build --prod` substitui` environment.ts` por `environment.prod.ts`.
// A lista de substituições de arquivo pode ser encontrada em `angular.json`.

export const environment = {
  production: false, 
  firebaseConfig:{apiKey: "AIzaSyAHua669-Aim3C56eNpFZicDfNSufLkdjA",
      authDomain: "angular-aula-6b32d.firebaseapp.com",
      databaseURL: "https://angular-aula-6b32d.firebaseio.com",
      projectId: "angular-aula-6b32d",
      storageBucket: "angular-aula-6b32d.appspot.com",
      messagingSenderId: "164065924958",
      appId: "1:164065924958:web:ac2bf536d26f3895dfe1cf",
      measurementId: "G-E6SXCRCJH4"}
};

/*
 * Para depuração mais fácil no modo de desenvolvimento, você pode importar o seguinte arquivo
 * para ignorar frames de pilha de erros relacionados à zona, como `zone.run`,` zoneDelegate.invokeTask`.
 *
 * Esta importação deve ser comentada no modo de produção porque terá um impacto negativo
 * no desempenho se um erro for lançado.
 */
// import 'zone.js/dist/zone-error';  // Incluido com o Angular CLI.
