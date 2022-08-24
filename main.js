let letraAtual = 1;
let palavraChave = "";
let palavra = document.getElementById("palavra");
let jogo = document.getElementById("jogo");
let numTentativas = document.getElementById('tentativas-restantes');
let p = document.getElementById('msgErro');
let imagem = document.getElementById("img");
let caminhoImg = ["primeiro_erro.png", "segundo_erro.png", "terceiro_erro.png", "quarto_erro.png", "quinto_erro.png", "sexto_erro.png"];
let letraSegredo = document.getElementsByClassName('letra-li');
const regex = /^[a-záàâãéèêíïóôõöúçñ-]+$/i;
let letraDigitada = "";
let salvaLetraDigitada = [];
let tentativas = 18;
let errou = 0;

// Função executada ao carregar a página
window.addEventListener("load", carregaPagina);
// Função executada após usuário digitar:
window.addEventListener("keyup", teclaPressionada);

function carregaPagina() {
    // Retorna uma palavra aleatória da API do dicionário aberto
    fetch('https://api.dicionario-aberto.net/random')
        .then(res => res.json())
        .then((data) => {
            console.log(data.word)
            palavraChave = data.word.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); //remove os acentos
            console.log(palavraChave);
            criarLista();
        })
}

function criarLista() {
    for (letraAtual; letraAtual <= palavraChave.length; letraAtual++) {
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
    let criaP = document.createElement('p');

    numTentativas.innerHTML = `Tentativas: ${tentativas.toString()}`;


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
            || e.key === "Dead"
            || (e.keyCode >= 33 && e.keyCode <= 34) /*Page Down, Page Up */
            || (e.keyCode >= 112 && e.keyCode <= 123) /* F1 - F12 */
            || (e.keyCode >= 144 && e.keyCode <= 145))/* Num Lock, Scroll Lock */
        {
            return false;
        } else letraDigitada = e.key;
    }

    salvaLetraDigitada.push(letraDigitada);

    for (let i = 0; i <= palavraChave.length - 1; i++) {
        if (letraSegredo[i].innerHTML === '') {
            if (letraDigitada === palavraChave[i]) {
                letraSegredo[i].innerHTML = letraDigitada;
            }
        }
    }

    let j = palavraChave.indexOf(letraDigitada);
    if (j === -1) {
        errou++;
        tentativas--;
        console.log(`Errou = ${errou}`);
        criaP.innerHTML = letraDigitada;
        criaP.className = 'msgErro';
        jogo.appendChild(criaP);
        switch (errou) {
            case 3:
                imagem.src = caminhoImg[0];
                break;
            case 6:
                imagem.src = caminhoImg[1];
                break;
            case 9:
                imagem.src = caminhoImg[2];
                break;
            case 12:
                imagem.src = caminhoImg[3];
                break;
            case 15:
                imagem.src = caminhoImg[4];
                break;
            case 19:
                imagem.src = caminhoImg[5];
                perdeuJogo();
                window.removeEventListener("keyup", teclaPressionada);
                break;

        }
    }
    console.log(`e.key = ${e.keyCode}`); // letraDigitada resultados: Letra ou Dead (se for acento) ou invalido (se numero ou teclas modificadoras
}

function perdeuJogo() {
    for (let i = 0; i <= palavraChave.length - 1; i++) {
            letraSegredo[i].innerHTML = palavraChave[i];
    }
}
