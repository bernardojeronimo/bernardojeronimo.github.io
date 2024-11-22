document.addEventListener('DOMContentLoaded', () => {
    fetch('https://deisishop.pythonanywhere.com/products/')
        .then(response => response.json())
        .then(produtos => {
            const categorias = [];
            for (let i = 0; i < produtos.length; i++) {
                if (!categorias.includes(produtos[i].category)) {
                    categorias.push(produtos[i].category);
                }
            }

            carregarProdutos(produtos);
            carregarFiltros(categorias, produtos);
        })
        .catch(error => console.error('Erro:', error));
    carregarCarrinho();
});

function carregarFiltros(categorias, produtos) {
    const filtrosContainer = document.createElement('section');
    filtrosContainer.id = 'filtros-categorias';
    filtrosContainer.classList.add('filtros');

    const titulo = document.createElement('h3');
    titulo.textContent = 'Filtrar';
    filtrosContainer.append(titulo);

    const selected = document.createElement('select');
    selected.id = 'categoria-select';
    filtrosContainer.append(selected);

    const todosFiltro = document.createElement('option');
    todosFiltro.textContent = 'Todas as Categorias';
    todosFiltro.value = 'Todas as Categorias';
    selected.append(todosFiltro);

    for (let i = 0; i < categorias.length; i++) {
        const option = document.createElement('option');
        option.textContent = categorias[i];
        option.value = categorias[i];
        selected.append(option);
    }

    selected.addEventListener('click', () => {
        const categoriaSelecionada = selected.value;
        const sectionProdutos = document.getElementById('produtos');
        sectionProdutos.innerHTML = '';

        const produtosFiltrados = categoriaSelecionada == 'Todas as Categorias'
            ? produtos
            : produtos.filter(produto => produto.category == categoriaSelecionada);

        carregarProdutos(produtosFiltrados);
    });


    const ordenar = document.createElement('h3');
    ordenar.textContent = 'Ordenar';
    filtrosContainer.append(ordenar);

    const selected2 = document.createElement('select');
    selected2.id = 'categoria-select';
    filtrosContainer.append(selected2);

    for (let i = 0; i < categorias.length; i++) {
        const option = document.createElement('option');
        option.textContent = categorias[i];
        option.value = categorias[i];
        selected2.append(option);
    }


    const procurar = document.createElement('h3');
    procurar.textContent = 'Procurar';
    filtrosContainer.append(procurar);

    const selected3 = document.createElement('textarea');
    selected3.id = 'categoria-select';
    filtrosContainer.append(selected3);

    const sectionProdutos = document.getElementById('produtos');
    sectionProdutos.parentNode.insertBefore(filtrosContainer, sectionProdutos);

}

function carregarProdutos(produtos) {
    const sectionpro = document.getElementById('produtos');

    produtos.forEach(produto => {
        const elemento = criarProduto(produto);
        sectionpro.append(elemento);
    });
}

function criarProduto(produto) {
    const article = document.createElement('article');
    article.classList.add('produto');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = produto.image;
    img.alt = produto.title;
    figure.append(img);

    article.append(figure);

    const info = document.createElement('section');
    info.classList.add('produto-info');

    const h2 = document.createElement('h2');
    h2.textContent = produto.title;

    const categoria = document.createElement('span');
    categoria.classList.add('categoria');
    categoria.textContent = produto.category;

    const descricao = document.createElement('p');
    descricao.classList.add('descricao');
    descricao.textContent = produto.description;

    const detalhes = document.createElement('section');
    detalhes.classList.add('produto-detalhes');

    const preco = document.createElement('strong');
    preco.classList.add('preco');
    preco.textContent = `${produto.price}€`;

    const rating = document.createElement('span');
    rating.classList.add('rating');
    rating.textContent = `★ ${produto.rating.rate} (${produto.rating.count})`;

    const btn = document.createElement('button');
    btn.textContent = '+ Adicionar ao cesto';
    btn.addEventListener('click', () => {
        btn.textContent = 'Adicionado';

        setTimeout(() => {
            btn.textContent = '+ Adicionar ao cesto';
        }, 2000);

        adicionarCarrinho(produto);
    });

    info.append(h2);
    info.append(categoria);
    info.append(descricao);
    detalhes.append(preco);
    detalhes.append(rating);

    article.append(figure);
    article.append(info);
    article.append(detalhes);
    article.append(btn);
    return article;
}

function adicionarCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function carregarCarrinho() {
    const sectionCarrinho = document.getElementById('carrinho');
    sectionCarrinho.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Produtos Selecionados';
    sectionCarrinho.append(title);

    const carrinho = JSON.parse(localStorage.getItem('carrinho'));

    if (carrinho.length > 0) {
        const carrinhoContainer = document.createElement('section');
        carrinhoContainer.classList.add('pCont');

        let total = 0;

        carrinho.forEach(produto => {
            const elementoCarrinho = criarProdutoCarrinho(produto);
            carrinhoContainer.append(elementoCarrinho);
            total += produto.price;
        });

        sectionCarrinho.append(carrinhoContainer);

        const totalElement = document.createElement('p');
        totalElement.classList.add('total');
        totalElement.textContent = `Custo total: ${total.toFixed(2)}€`;
        sectionCarrinho.append(totalElement);
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'O carrinho está vazio';
        emptyMessage.classList.add('empty-cart-message');
        sectionCarrinho.append(emptyMessage);
    }
}

function criarProdutoCarrinho(produto) {
    const article = document.createElement('article');
    article.classList.add('produto', 'carrinho');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = produto.image;
    img.alt = produto.title;
    figure.append(img);

    const info = document.createElement('section');
    info.classList.add('produto-info');

    const h2 = document.createElement('h2');
    h2.textContent = produto.title;

    const categoria = document.createElement('span');
    categoria.classList.add('categoria');
    categoria.textContent = produto.category;

    const detalhes = document.createElement('section');
    detalhes.classList.add('produto-detalhes');

    const preco = document.createElement('strong');
    preco.classList.add('preco');
    preco.textContent = `${produto.price}€`;

    const btn = document.createElement('button');
    btn.textContent = '- Remover do cesto';
    btn.addEventListener('click', () => {
        let carrinho = JSON.parse(localStorage.getItem('carrinho'));

        const index = carrinho.findIndex(p => p.title == produto.title);
        if (index != -1) {
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }

        carregarCarrinho();
    });

    info.append(h2);
    info.append(categoria);
    detalhes.append(preco);

    article.append(figure);
    article.append(info);
    article.append(detalhes);
    article.append(btn);

    return article;
}