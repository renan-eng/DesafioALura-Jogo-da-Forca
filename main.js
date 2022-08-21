

let letraAtual = 0;
const palavraChave = "parabens"; // this can be obtained dynamically
let palavra = document.getElementById("palavra");
let jogo = document.getElementById("jogo");

// Função executada ao carregar a página
window.addEventListener("load", carregaPagina);
// Função executada após usuário digitar:
window.addEventListener("keydown", teclaPressionada);

function carregaPagina() {
    console.log('oi') //primeiro comando a ser carregado ao carregar a pagina.
    /*Testando*/
    criarLista();

}

function criarLista() {
    for (letraAtual; letraAtual <= palavraChave.length; letraAtual++) {
        //console.log(palavraChave[letraAtual])

        palavra.appendChild(novaLetra("e"));

    }
}

function novaLetra(e) {
    let li = document.createElement("li")
    li.id = 'letra-li';
    li.appendChild(document.createTextNode("_"));
    return li  ;
}



function teclaPressionada(e) {
    e.preventDefault();
    let letraDigitada = "";
    const regex = /[a-zA-Z\u00C0-\u00FF]+/i; //letras do alfabeto
    regex.test(e.key) ? letraDigitada = e.key : letraDigitada = 'invalido';
    console.log(letraDigitada); // letraDigitada resultados: Letra ou Dead (se for acento) ou invalido (se numero ou teclas modificadoras
    let lSegredo = document.getElementsByTagName('li');
    console.log(lSegredo[1].innerHTML);
    if (lSegredo[0].innerHTML === '_') {
        if (e.key === palavraChave[0]){
            lSegredo[0].innerHTML = e.key;
        } else {
            let p = document.createElement('p');
            p.innerHTML = 'Letra errada, tente novamente.'
            jogo.appendChild(p)
        }
    }
}