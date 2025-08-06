const uploadBtn = document.getElementById("upload_btn");
const inputUpload = document.getElementById("image_upload");
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")


uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

// Adiciona um ouvinte de evento ao input de upload (inputUpload)
// Esse evento será disparado sempre que o usuário selecionar um arquivo
inputUpload.addEventListener("change", async (e) => {
    // Pega o primeiro arquivo selecionado pelo usuário
    // e.target representa o input, e files é uma lista com os arquivos enviados
    var file = e.target.files[0];
    
    
    // Aqui você pode fazer algo com esse arquivo, como exibir o nome, enviar para um servidor, etc.
    if(!file.type.match('image/png') && !file.type.match("image/jpeg")){
        alert("Por favor, selecione uma imagem PNG ou JPEG.")
        return;
    }
    if(file.size > 2 * 1024 * 1024){
        alert("A imagem deve ter no máximo 2MB.");
    } if(file){
        try{
            const conteudoDoArquivo = await lerConteudoDoArquivo(file);
            imagemPrincipal.src = conteudoDoArquivo.url
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        
        }catch(error){
            console.error("Erro na leitura do arquivo");
        }
    }
});



function lerConteudoDoArquivo(file) {
    // Imagine que estamos fazendo um pedido em uma confeitaria (Promise)
    return new Promise((resolve, reject) => {
        // O FileReader é como o padeiro, responsável por preparar o bolo (ler o arquivo)
        const leitor = new FileReader();

        // Quando o bolo estiver pronto (onload), a confeitaria te entrega (resolve)
        leitor.onload = () => {
            // Resolve: entrega o bolo (url e nome do arquivo)
            resolve({ url: leitor.result, nome: file.name });
        }

        // Se o bolo queimar (onerror), a confeitaria te avisa (reject)
        leitor.onerror = () => {
            // Reject: informa que houve um erro na leitura do arquivo
            reject(`Erro na leitura do arquivo ${file.name}`);
        }

        // readAsDataURL é como a receita do bolo, diz ao padeiro como preparar (ler)
        leitor.readAsDataURL(file); // Passa o arquivo para o leitor (padeiro)
    })
}



// Seleciona o input onde o usuário digita a tag
const inputTags = document.getElementById("categoria");

// Seleciona a lista (ul ou ol) onde as tags serão adicionadas
const listaTags = document.getElementById("lista_tags");



// Adiciona um evento à lista de tags que escuta cliques
listaTags.addEventListener("click", (e) => {
    // Verifica se o elemento clicado tem a classe "remove-tag"
    if (e.target.classList.contains("remove-tag")) {
        // Pega o elemento pai do botão de remover (o <li>)
        const tagQueremosRemover = e.target.parentElement;

        // Remove a tag (li) da lista
        listaTags.removeChild(tagQueremosRemover);
    }
});

// Lista de tags disponíveis
const tagsDisponiveis = ["Front-end", "Back-end", "HTML", "CSS", "Java-Script", "Full-Stack", "Programação", "Data Science", "React-Js"].map(tag => tag.toUpperCase());

// Função assíncrona que verifica se uma determinada tag está disponível
async function verificaTagsDisponiveis(tagTexto){
    return new Promise((resolve) => { // Retorna uma Promise (simulando uma chamada assíncrona, como se fosse a um servidor)
        setTimeout(() => { // Espera 1 segundo (1000 milissegundos) antes de executar
            resolve(tagsDisponiveis.includes(tagTexto)); // Retorna true se a tag estiver na lista, senão false
        }, 100 );
    });
}

// Adiciona um evento que escuta quando o usuário pressiona uma tecla dentro do input
inputTags.addEventListener("keypress", async (e) => {
    // Verifica se a tecla pressionada foi "Enter"
    if (e.key === "Enter") {
        e.preventDefault(); // Impede que o formulário (caso exista) seja enviado

        // Pega o valor do input e remove espaços extras das extremidades
        const tagTexto = inputTags.value.trim();
        const tagValidada = tagTexto.toUpperCase();
        // Verifica se o texto não está vazio
        if (tagTexto !== "") { 
            try{
                const tagExiste = await verificaTagsDisponiveis(tagValidada);
                if(tagExiste){
                    // Cria um novo elemento <li> para a tag
                    const tagNova = document.createElement("li");
                    // Adiciona o conteúdo da tag (o texto e o botão de remover com imagem)
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    // Adiciona a nova tag à lista de tags  
                    listaTags.appendChild(tagNova);
                }else{
                    alert("Tag não encontrada");
                }
            }catch(error){
                console.error("Erro ao verificar a existência da tag")
                alert("Erro ao verificar a existência da tag. Verifique o console.")
            }
        }
        // Limpa o input para digitar uma nova tag
        inputTags.value = "";
    }
});

const botaoPublicar = document.querySelector(".botao-publicar")

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjetos){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if(deuCerto){
                resolve("Projeto publicado com sucesso")
            }else{
                reject("Erro ao publicar projeto")
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener("click", async (e) => {
    e.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value.trim();
    const descricaoDoProjeto = document.getElementById("descricao").value.trim();
    const tagsProjetos = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent.trim());

    try {
        await validarFormulario(nomeDoProjeto, descricaoDoProjeto, tagsProjetos);

        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjetos);
        console.log("Projeto publicado com sucesso:", resultado);
        alert("Projeto publicado com sucesso!");

        // Limpa os campos após publicação
        document.getElementById("nome").value = "";
        document.getElementById("descricao").value = "";
        listaTags.innerHTML = ""; // remove todas as tags da lista

    } catch (error) {
        console.error("Erro ao publicar:", error.message);
        alert("Erro ao publicar: " + error.message);
    }
});

const btnDescartar = document.querySelector(".botao-descartar");

btnDescartar.addEventListener("click", (e) => {
    e.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = ""; // limpa as tags ao descartar também
});

    

// Validação com mensagens específicas
async function validarFormulario(nome, descricao, tags) {
    if (!nome) {
        throw new Error("O nome do projeto não pode estar vazio.");
    }
    if (!descricao) {
        throw new Error("A descrição do projeto não pode estar vazia.");
    }
    if (!tags || tags.length === 0) {
        throw new Error("Adicione ao menos uma tag para o projeto.");
    }
}