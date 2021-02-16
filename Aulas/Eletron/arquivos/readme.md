# Arquivos
## Renderer

###### Código
    <body>
        <div id="box">
            <h1>Arraste o seu arquivo aqui</h1>
        </div>
        <script>
            const box = document.getElementById('box') || null;
            box.ondragover = () => {return false};
            box.ondragleave = () => {return false};
            box.ondragend = () => {return false};
            box.ondrop = event => {
                event.preventDefault();
                const arrayFiles = Array.from(event.dataTransfer.files);
                arrayFiles.forEach(console.log);
            }
        </script>
    </body>

###### Explicando
Você pode habilitar o arrasto de arquivos para dentro de uma div, conforme o ilustrado acima.

## Native Image
[Documentação](https://www.electronjs.org/docs/api/native-image#m%C3%A9todos-de-inst%C3%A2ncia)