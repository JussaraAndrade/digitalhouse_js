
const listaLivrosA = [];
const nAleatorios = [];
const listaLivros = []
const jsonAddress = 'js/livros.json';
const card = document.querySelector('.showcase');
var cont = 0;
fetch(jsonAddress)
.then(status => status.json())
.then(data => listaLivrosA.push(...data))
.then(() => {;
    let rand;
    do{
        rand = Math.floor(Math.random() * 18);
        if(nAleatorios.indexOf(rand) == -1){
            nAleatorios.push(rand);
        }
    }while(nAleatorios.length < 18);
     console.log(nAleatorios);

    for(i = 0; i < 18; i++){
        let x = nAleatorios[i]
        listaLivros.push(listaLivrosA[x]);
    }
    for (i = 0; i < 6; i++){
        cont++;
        card.innerHTML += cards(listaLivros[i]);
        }
    }
)

function cards(json){
    return `
    <div class="card" ">
        <img src="${json.imagem}" alt="Capa do livro ${json.titulo} id="${json.numero}">
        <div class="container">
            <p class="titulo"><strong>${json.titulo}</strong></p>
            <p class="autor">Autor: ${json.autor}</p>    
            <p class="preco">Preço: ${json.preco}</p>
        </div>
    </div>    
    ` 
}

const trocarLivrosProx = document.getElementById("btn_livros_prox");
trocarLivrosProx.addEventListener("click", function(){
    passar(listaLivros, 1);
})
const trocarLivrosAnt = document.getElementById("btn_livros_ant");
trocarLivrosAnt.addEventListener("click", function(){
    passar(listaLivros, 0);
})

function passar(json, n){
    card.innerHTML = "";    
    if(cont == 6 && n == 1){
        cont = 12;
        for(i = 6; i < 12; i++){
            card.innerHTML += cards(listaLivros[i]);
        }
    }else if(cont == 6 && n == 0){
        cont = 18;
        for(i = 12; i < 18; i++){
            card.innerHTML += cards(listaLivros[i]);
        }
    }else if(cont == 12 && n == 1){
        cont = 18
        for(i = 12; i < 18; i++){
            card.innerHTML += cards(listaLivros[i]);
        }
    }else if(cont == 12 && n == 0){
        cont = 6;
        for(i = 0; i < 6; i++){
            card.innerHTML += cards(listaLivros[i]);
        }
    }else if(cont == 18 && n == 1){
        cont = 6;
        for(i = 0; i < 6; i++){
            card.innerHTML += cards(listaLivros[i]);
        }
    }else if(cont == 18 && n == 0){
        cont = 12;
        for(i = 6; i < 12; i++){
            card.innerHTML += cards(listaLivros[i]);
        }
    }
}

const pesquisar = document.getElementById("search_button");
const barraPesquisa = document.getElementById("search_bar");
pesquisar.addEventListener("click", pesquisarLivros);
barraPesquisa.addEventListener("keyup", function(e){
    if(e.keyCode === 13)
        pesquisarLivros();
});


function pesquisarLivros(){
    if(barraPesquisa.value == "" || barraPesquisa.value.length < 4){
        card.innerHTML = "";
        card.innerHTML += digiteAlgo(barraPesquisa.value.length);
    }else{
        let livrosFilter = [];
        let s, words, searchWords;
        for(i = 0; i < listaLivros.length; i++){
            s = listaLivros[i].titulo.toUpperCase();
            words = s.split(/\W+/).filter(x => x.length > 3);
            searchWords = barraPesquisa.value.split(/\W+/).filter(x => x.length > 3);
            for(var j = 0; j < words.length; j++){
                for(var h = 0; h < searchWords.length; h++){
                    if(searchWords[h].toUpperCase() == words[j]){
                        livrosFilter.push(i);
                        break
                }
                }  
            }
        }
        if(livrosFilter.length > 0){
            const array = [...new Set(livrosFilter)];
        
            //console.log(array);
            card.innerHTML = "";
            for(i = 0; i < array.length && i < 6; i++){
                j = array[i];
                card.innerHTML += cards(listaLivros[j])
            }
        }else{
            card.innerHTML = "";
            card.innerHTML += notFound();
        }
    }
}

function notFound() {
    return `
    <div class="notTyped" ">
        <h2>Livro não encontrado!</h2>
    </div>    
    ` 
}

function digiteAlgo(search) {
    if(search == 0){
        return `
        <div class="notTyped" ">
            <h2>Digite alguma coisa no campo de pesquisa!</h2>
        </div>    
        ` 
    }else{
        return `
        <div class="notTyped" ">
            <h2>Digite mais de 3 caracteres</h2>
        </div>    
        `
    }   
}