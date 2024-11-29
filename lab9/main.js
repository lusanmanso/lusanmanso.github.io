// localStorage caso ela não exista
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}
// Crie um eventlistener que, quando tenha descarregado todo o DOM (evento JavaScript DOMContentLoaded),
// chame uma função carregarProdutos(produtos) que recebe como argumento a variável produtos.
document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos(produtos);
})

// Recebe lista de produtos
function carregarProdutos(produtos) {

    const productContainer = document.getElementById("produtos");
    produtos.forEach(produto => {
        const newArticle = criarProduto(produto);
        productContainer.appendChild(newArticle)
    });
}

// Recebe o produto a inserir
function criarProduto(produto) {
    const newArticle = document.createElement("article");
    newArticle.className = "product"

    // Título
    const title = document.createElement("h3")
    title.textContent = produto.title;
    // Image
    const image = document.createElement("img");
    image.src = produto.image;
    image.alt = produto.title;
    // Price
    const price = document.createElement("p")
    price.className = "product-price";
    price.textContent = `Precio: ${produto.price}$`;
    // Description
    const description = document.createElement("p")
    description.className = "product-description";
    description.textContent = produto.description;

    const shoppingButton = document.createElement("button");
    shoppingButton.textContent = 'Adicionar ao cesto'

    newArticle.append(title, image, price, description, shoppingButton);

    // Nessa mesma função, crie um eventListener que é despoletado se o botao for clicado.
    shoppingButton.addEventListener("click", () => {
        // Obter lista do localStorage
        let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));

        // adiciono o produto con todos os datos
        produtosSelecionados.push({
            id: produto.id,
            title: produto.title,
            price: produto.price,
            image: produto.image,
            description: produto.description,
        });

        // Atualizar localStorage
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

        // mensagem de confirmação
        alert('"${produto.title}" was added');

    })

    return newArticle;
}

function atualizaCesto() {
    // Buscar a lista de produtos-selecionados no localStorage
    let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    // Percorre a lista
    produtosSelecionados.forEach(produto => {
        criarProduto(produto);
    })
}

function criaProdutoCesto(produto) {

}