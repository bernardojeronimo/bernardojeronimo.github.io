document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos);
    carregarCarrinho();
});

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
    btn.textContent = '+ Adicionar ao carrinho';
    btn.addEventListener('click', () => {
        btn.textContent = 'Adicionado';

        setTimeout(() => {
            btn.textContent = '+ Adicionar ao carrinho';
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
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    carrinho.push(produto);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}


function carregarCarrinho() {
    const sectionCarrinho = document.getElementById('carrinho');

    const carrinho = JSON.parse(localStorage.getItem('carrinho'));

    carrinho.forEach(produto => {
        const elementoCarrinho = criarProdutoCarrinho(produto);
        sectionCarrinho.append(elementoCarrinho);
    });
}


function criarProdutoCarrinho(produto) {
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

    const btn = document.createElement('button');
    btn.textContent = 'Remover';

    info.append(h2);
    info.append(categoria);
    info.append(descricao);
    detalhes.append(preco);

    article.append(figure);
    article.append(info);
    article.append(detalhes);
    article.append(btn);
    return article;
    };
