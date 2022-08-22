let letraAtual = 1;
const palavraChave = "desistir"; // this can be obtained dynamically
let palavra = document.getElementById("palavra");
let jogo = document.getElementById("jogo");
let p = document.getElementById('msgErro');
let imagem = document.getElementById("img");
let caminhoImg = ["/assets/img/segundo_erro.png", "/assets/img/terceiro_erro.png", "/assets/img/quarto_erro.png", "/assets/img/quinto_erro.png", "/assets/img/sexto_erro.png"];
let letraSegredo = document.getElementsByClassName('letra-li');
const regex = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
let letraDigitada = "";
let ganhou = true;
let errou = 0;



// Função executada ao carregar a página
window.addEventListener("load", carregaPagina);
// Função executada após usuário digitar:
window.addEventListener("keyup", teclaPressionada);

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


function teclaPressionada(e) {
    //let letraSegredo = document.getElementsByClassName('letra-li');
    let criaP = document.createElement('p');

    e.preventDefault();

    if (regex.test(e.key)) {
        // Verifica se a tecla pressionada não é tecla especial
        if (e.keyCode === 20 /* Caps lock */
            || e.keyCode === 16 /* Shift */
            || e.keyCode === 9 /* Shift */
            || e.keyCode === 8 /* Tab */
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
            || e.key === 'Dead') {
            return false;
        } else letraDigitada = e.key;
    }

    //while (ganhou) {
    for (let i = 0; i <= palavraChave.length-1; i++) {
        //console.log(letraSegredo[i].innerHTML);
        //x = letraSegredo[i].innerHTML

        if (letraSegredo[i].innerHTML === '') {
            if (letraDigitada === palavraChave[i]) {
                letraSegredo[i].innerHTML = letraDigitada;
            } else if (letraDigitada !== palavraChave[i]) {
                errou++;
                console.log(`Errou = ${errou}`);
                criaP.innerHTML = letraDigitada;
                criaP.className = 'msgErro';
                jogo.appendChild(criaP);
                switch (errou) {
                    case 8:
                        imagem.src = caminhoImg[0];
                        break;
                    case 16:
                        imagem.src = caminhoImg[1];
                        break;
                    case 24:
                        imagem.src = caminhoImg[2];
                        break;
                    case 32:
                        imagem.src = caminhoImg[3];
                        break;
                    case 40:
                        imagem.src = caminhoImg[4];
                        break;
                }
            }
        }



    }

    //}
    console.log(`e.key = ${e.key}`); // letraDigitada resultados: Letra ou Dead (se for acento) ou invalido (se numero ou teclas modificadoras
    //console.log(letraSegredo[1].innerHTML);

}