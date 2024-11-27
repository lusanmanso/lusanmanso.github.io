
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

    const title = document.createElement("h3")
    title.textContent = produto.title;
    const image = document.createElement("img");
    image.src = produto.image;
    image.alt = produto.title;
    const price = document.createElement("p")
    price.textContent = `Precio: ${produto.price}$`;
    const description = document.createElement("p")
    description.textContent = produto.description;

    newArticle.append(title, image, price, description);

    return newArticle;
}