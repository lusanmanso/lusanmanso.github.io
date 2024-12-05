const categorySelect = document.getElementById("filter-select");
const sortSelect = document.getElementById("sort-select");
const searchInput = document.getElementById("search-input");

// Added for Projeto 2 - Defensa
const buyEverything = document.getElementById("everythingButton");
const lessInfo = document.getElementById("lessInfo");
let productList = [];

// Manage the category change
categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;

    // condición ? valor_si_es_verdadero : valor_si_es_falso;
    const filteredProducts = selectedCategory
    ? productList.filter(product => product.category == (selectedCategory)) // Filtrar por categoría
    : productList; // Mostrar todos los productos si no hay categoría seleccionada

    carregarProdutos(filteredProducts); // Mostrar los productos filtrados
});

sortSelect.addEventListener("change", () => {
  const sortOrder = sortSelect.value; // 'asc' ou 'desc'
  // 1. Alterar o seletor de ordenação para rating
  const sortedProducts = [...productList].sort((a, b) => {
      return sortOrder === "asc" ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate;
  });

  carregarProdutos(sortedProducts);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  // 3. Considerar também a descrição do produto
  const filteredProducts = productList.filter(product => {
    return product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
  });

  carregarProdutos(filteredProducts);
});

// 2. Cria um botão que adiciona todos os produtos ao carrinho
buyEverything.addEventListener("click", (productList) => {

  let produtosSelecionados = JSON.parse(localStorage.getItem("produtos-selecionados"));

  productList.forEach(product => {
    if(!produtosSelecionados.some(p => p.id == product.id)) {
      produtosSelecionados.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description
      });
    }
  });

  localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

  atualizaCesto();

  alert("Todos os produtos foram adicionados ao carrinho!");
});

// 4. Menos info que elimina la description
lessInfo.addEventListener("click", () => {

  const descriptions = document.querySelectorAll('.product-description')

  descriptions.forEach(description => {
    if(description.style.display == "none") { // if it actually appears or not
      description.style.display = "block";
    } else {
      description.style.display = "none";
    }
  });

});

// localStorage caso ela não exista
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// Recebe lista de produtos
function carregarProdutos(productList) {

    const productContainer = document.getElementById("produtos");

    productContainer.innerHTML = ""; // Limpiar contenido previo

    productList.forEach(produto => {
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

        atualizaCesto();

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

    cargarProductos(productList);

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

        atualizaCesto();

    })

    newArticleCart.append(title, image, price, deleteButton)

    return newArticleCart;
}

document.addEventListener("DOMContentLoaded", () => {

  // Cargar categorías
  fetch("https://deisishop.pythonanywhere.com/categories")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener categorías");
      }
      return response.json();
    })
    .then(categories => {
      // Add the "All" option
      const allCategoriesOption = document.createElement("option");
      allCategoriesOption.value = "";
      allCategoriesOption.innerText = "Todas as categorias";
      categorySelect.append(allCategoriesOption);

      // Add the rest categories
      categories.forEach(category => {        
        const optionElement = document.createElement("option");
        optionElement.value = category;
        optionElement.innerText = category;
        categorySelect.append(optionElement);
      });
    })
    .catch(error => console.error("Error at charging categories:", error));

  // Cargar todos los productos al inicio
  fetch("https://deisishop.pythonanywhere.com/products/")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      return response.json();
    })
    .then(products => {
      productList = products;
      cargarProductos(productList); // Mostrar todos los productos al inicio
    })
    .catch(error => console.error("Error al cargar productos:", error));

    atualizaCesto();

});