fetch("https://deisishop.pythonanywhere.com")
    .then(responde => responde.json())
    .then(categories => {
        console.log(categories);
    });

const categorySelect = document.getElementById("filter-select");

fetch("https://deisishop.pythonanywhere.com/categories")
    .then(response => response.json())
    .then((categories) => {
        let categoryList = categories;

        categoryList.forEach(category => {
            const optionElement = document.createElement("option");
            // ? optionElement.value = category.name;
            optionElement.innerText = category.name;
            categoryList.append(optionElement);
        });
    });

let productList = [];

fetch("https://deisishop.pythonanywhere.com/products")
    .then(respondse => response.json())
    .then(products => {
        productList = products;
        console.log(productList);
    });

categorySelect.addEventListener("change", ()=> {
    document.innerHTML = ''; // Clean the document
    const selectedCategory = categorySelect.value;

    const filteredProducts = productList.filter((product) => {
        product.category.includes(selectedCategory);
    })

    filteredProducts.forEach(product => {
        const newArticle = createProduct(product);
        document.body.appendChild(newArticle);
    });
});

/*
// localStorage caso ela não exista
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}
// Crie um eventlistener que, quando tenha descarregado todo o DOM (evento JavaScript DOMContentLoaded),
// chame uma função carregarProdutos(produtos) que recebe como argumento a variável produtos.
document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos(produtos);
    atualizaCesto();
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
        alert(`"${produto.title}" was added`);

    })

    return newArticle;
}

// 1. Obtener lista de productos seleccionados
// 2. criaProdutoCesto() para crear y añadir un <article> al contenedors
// 3. Limpiar contenedor antes de actualizar (para evitar duplicados)
function atualizaCesto() {
    // Buscar a lista de produtos-selecionados no localStorage
    const cesto = document.getElementById("cesto")
    cesto.innerHTML = ""; // Limpia contenido previo
    // Percorre a lista
    let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'))

    produtosSelecionados.forEach(produto => {
        const cestoItem = criaProdutoCesto(produto)
        cesto.append(cestoItem);
    })

}

function criaProdutoCesto(produto) {

    // Crear un nuevo elemento pero va dentrodel cesto
    const newArticleCart = document.createElement("article")
    newArticleCart.className = "cart-product"

    const title = document.createElement("h3")
    title.textContent = produto.title;

    const image = document.createElement("img")
    image.src = produto.image;
    image.alt = produto.title;

    const price = document.createElement("p")
    price.className = "product-price";
    price.textContent = `Precio: ${produto.price}$`;

    // Crear un boton con eventListener adecuado para eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Eliminar do cesto'

    // Atualizar lista productos-selecionados
    deleteButton.addEventListener("click", () => {
        let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'))

        produtosSelecionados = produtosSelecionados.filter(p => p.id != produto.id) // Filtro
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados)); // Actualizar localStorage

        atualizaCesto()
        location.reload();

    })

    newArticleCart.append(title, image, price, deleteButton)

    return newArticleCart;
}
*/