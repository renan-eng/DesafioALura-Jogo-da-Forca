let letraAtual = 1;
const palavraChave = "desistir"; // this can be obtained dynamically
let palavra = document.getElementById("palavra");
let jogo = document.getElementById("jogo");
const regex = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
let letraDigitada = "";
let ganhou = true;


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
        //Insere as letras
        palavra.appendChild(novaLetra("e"));
    }
}

function novaLetra(e) {
    let li = document.createElement("li")
    li.id = 'letra-li';
    li.className = 'letra-li';
    li.appendChild(document.createTextNode(""));
    return li;
}

let errou = 0;


function teclaPressionada(e) {
    const letraSegredo = document.getElementsByClassName('letra-li');
    let p = document.createElement('p');
    e.preventDefault();
    let x;
    //regex.test(e.key) ? letraDigitada = e.key : letraDigitada = 'invalido';

    if (regex.test(e.key)) {
        // Verifica se a tecla pressionada não é tecla especial
        if (   e.keyCode === 20 /* Caps lock */
            || e.keyCode === 16 /* Shift */
            || e.keyCode === 9 /* Tab */
            || e.keyCode === 27 /* Escape Key */
            || e.keyCode === 17 /* Control Key */
            || e.keyCode === 91 /* Windows Command Key */
            || e.keyCode === 19 /* Pause Break */
            || e.keyCode === 18 /* Alt Key */
            || e.keyCode === 93 /* Right Click Point Key */
            || (e.keyCode >= 35 && e.keyCode <= 40) /* Home, End, Arrow Keys */
            || e.keyCode === 45 /* Insert Key */
            || e.keyCode === 46 /* Delete Key */
            || (e.keyCode >= 33 && e.keyCode <= 34) /*Page Down, Page Up */
            || (e.keyCode >= 112 && e.keyCode <= 123) /* F1 - F12 */
            || (e.keyCode >= 144 && e.keyCode <= 145) /* Num Lock, Scroll Lock */
            || e.key === 'Dead'){
            return false;
        }
        else letraDigitada = e.key;
    }

    //while (ganhou) {
    for (let i = 0; i <= palavraChave.length; i++) {
        //console.log(letraSegredo[i].innerHTML);
        //x = letraSegredo[i].innerHTML
        if (true) {
            if (letraDigitada === palavraChave[i]) {
                letraSegredo[i].innerHTML = letraDigitada;
                letraSegredo[i].style.removeProperty('border-bottom')
            } else if (letraDigitada !== 'Control' && letraDigitada !== 'Alt') {
                errou = errou + 1;
                p.innerHTML = letraDigitada;
                p.className = 'msgErro';
                jogo.appendChild(p);
            }
        }
        if (errou => 3) {
            ganhou = false;
        }
    }

    //}
    console.log(e.keyCode); // letraDigitada resultados: Letra ou Dead (se for acento) ou invalido (se numero ou teclas modificadoras
    //console.log(letraSegredo[1].innerHTML);

}