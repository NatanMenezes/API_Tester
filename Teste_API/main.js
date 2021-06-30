var jsonBody
async function responseFetch() {
    if (Config.formato_retorno == "json" || Config.formato_retorno == "JSON") {
        try {
            var request = await fetch(Config.url)
            await console.log(request)
            jsonBody = await request.json()
            console.log(jsonBody)
            success();
        } catch (err) {
            error()
            try{
                console.log(request.status == 200 ? "Nós conseguimos acessar a sua API. Tente só mudar o formato_retorno no arquivo Config.js, provavelmente o erro estará por lá. Está tudo bem com a url e com o servidor." : "");
            } catch(err){
                console.log("Houve algum problema com a URL ou com o servidor da API")
            }
            console.log("Aqui está o status do erro: "+err)
        }
    } else if (Config.formato_retorno == "xml" || Config.formato_retorno == "XML"){
        try {
            var request = await fetch(Config.url)
            await console.log(request)
            var parser = new DOMParser();
            var textBody = await request.text()
            var xmlDoc = parser.parseFromString(textBody,"text/xml");
            jsonBody = xmlToJson(xmlDoc)
            console.log(xmlDoc)
            console.log(jsonBody)
            success();
        } catch (err) {
            error()
            try{
                console.log(request.status == 200 ? "Nós conseguimos acessar a sua API. Tente só mudar o formato_retorno no arquivo Config.js, provavelmente o erro estará por lá. Está tudo bem com a url e com o servidor." : "");
            } catch(err){
                console.log("Houve algum problema com a URL ou com o servidor da API")
            }
            console.log("Aqui está o status do erro: "+err)
        }
    }else{
        try {
            var request = await fetch(Config.url)
            await console.log(request)
            var textBody = await request.text()
            console.log(textBody)
            success();
        } catch (err) {
            error()
            try{
                console.log(request.status == 200 ? "Nós conseguimos acessar a sua API. Tente só mudar o formato_retorno no arquivo Config.js, provavelmente o erro estará por lá. Está tudo bem com a url e com o servidor." : "");
            } catch(err){
                console.log("Houve algum problema com a URL ou com o servidor da API")
            }
            console.log("Aqui está o status do erro: "+err)
        }
    }

}

function success() {
    document.getElementById("content").style.paddingTop = "3%"
    document.getElementById("result").innerText = "Sua API Funcionou"
    document.getElementById("btn").innerHTML = "<h2>Teste novamente</h2>"
    document.getElementById("inst").innerText = "Olhe o retorno no console. Aperte F12."
    document.getElementById("inst").style.display = "inline-text"
}
function error() {
    document.getElementById("content").style.paddingTop = "5%"
    document.getElementById("result").innerText = "Ops, :-( Sua API deu erro!"
    document.getElementById("btn").innerHTML = "<h2>Teste novamente</h2>"
    document.getElementById("inst").innerText = "Olhe o retorno no console. Aperte F12."
    document.getElementById("inst").style.display = "inline-text"
}

function instrucoes() {
    document.getElementById("content").style.paddingTop = "3%"
    document.getElementById("content").innerHTML = `<h1 id="result">Instruções</h1>
    <p>Segue abaixo o passo a passo da utilização deste sistema.</p>
    <ol>
        <li>Baixe o este diretório na sua máquina</li>
        <li>Localize o arquivo <b>Config.js</b></li>
        <li>Mude o valor da url (Lembre-se de colocar a url completa, incluindo o protocolo).</li>
        <li>Defina o formato do retorno (XML ou JSON)</li>
        <li>Entre no  arquivo index.html no seu navegador (Apenas pelo PC)</li>
        <li>Clique em "Testar agora"</li>
        <li>Pronto! Agora é só ver a mensagem e olhar o console, lá você vai encontrar os dados recebidos e/ou os erros e possíveis correções.</li>
    </ol>
    <p>Espero que a utilização deste sistema seja para você tão prazerosa quanto o seu desenvolvimento.</p>
    <h5 class="info" id="info" onclick="reload()">Voltar</h5>`
}
function reload() {
    document.getElementById("content").style.paddingTop = "3%"
    document.getElementById("content").innerHTML = `<h1 id="result">Teste sua API</h1>
    <div class="btn" id="btn" onclick="responseFetch()"><h2>Testar API</h2></div>
    <h5 class="inst" id="inst"></h5>
    <h5 class="info" id="info" onclick="instrucoes()">Ver instruções</h5>`
}