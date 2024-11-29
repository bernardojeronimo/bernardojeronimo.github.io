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

    const ordem = document.createElement('option');
    ordem.textContent = 'Ordenar pelo preço';
    ordem.value = 'padrao';
    selected2.append(ordem);

    const option = document.createElement('option');
    option.textContent = 'Preço Decrescente';
    option.value = 'Preço Decrescente';
    selected2.append(option);

    const option2 = document.createElement('option');
    option2.textContent = 'Preço Crescente';
    option2.value = 'Preço Crescente'; 
    selected2.append(option2);

    selected2.addEventListener('click', () => {
        const ordemSelecionada = selected2.value;
        const sectionProdutos = document.getElementById('produtos');
        sectionProdutos.innerHTML = '';

        let produtosOrdenados = produtos;

        if (ordemSelecionada == 'Preço Decrescente') {
            produtosOrdenados.sort((a, b) => b.price - a.price);
        } else if (ordemSelecionada == 'Preço Crescente') {
            produtosOrdenados.sort((a, b) => a.price - b.price);
        }

        carregarProdutos(produtosOrdenados);
    });

    const procurar = document.createElement('h3');
    procurar.textContent = 'Procurar';
    filtrosContainer.append(procurar);

    const selected3 = document.createElement('input');
    selected3.type = 'text';
    selected3.placeholder = 'Pesquisar produto...';
    selected3.id = 'categoria-select';
    filtrosContainer.append(selected3);

    selected3.addEventListener('keyup', () => {
        const termo = selected3.value;
        const sectionProdutos = document.getElementById('produtos');
        sectionProdutos.innerHTML = '';
        const produtosFiltrados = produtos.filter(produto => produto.title.includes(termo));
        carregarProdutos(produtosFiltrados);
    });
    const sectionProdutos = document.getElementById('produtos');
    sectionProdutos.before(filtrosContainer, sectionProdutos);
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
    preco.textContent = `${produto.price.toFixed(2)}€`;

    const rating = document.createElement('span');
    rating.classList.add('rating');
    rating.textContent = `★ ${produto.rating.rate} (${produto.rating.count})`;

    const btn = document.createElement('button');
    btn.textContent = '+ Adicionar ao cesto';
    btn.addEventListener('click', () => {
        btn.textContent = 'Adicionado';

        setTimeout(() => {
            btn.textContent = '+ Adicionar ao cesto';
        }, 500);

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

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

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

        const comprar = document.createElement('section');
        comprar.classList.add('comprar');

        const totalElement = document.createElement('p');
        totalElement.classList.add('total');
        totalElement.textContent = `Custo total: ${total.toFixed(2)}€`;

        const estudanteVerificar = document.createElement('h4');
        estudanteVerificar.classList.add('estudante');
        estudanteVerificar.textContent = 'És estudante do DEISI?';

        const verificar = document.createElement('input');
        verificar.classList.add('estudante');
        verificar.type = 'checkbox';

        const cupao = document.createElement('h4');
        cupao.classList.add('cupao');
        cupao.textContent = 'Cupão de desconto:';

        const desconto = document.createElement('input');
        desconto.classList.add('cupao');
        desconto.type = 'text';

        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.textContent = 'Comprar';

        const valorFinalElement = document.createElement('p');
        valorFinalElement.classList.add('recibo');
        valorFinalElement.textContent = '';

        const referenciaElement = document.createElement('p');
        referenciaElement.classList.add('recibo');
        referenciaElement.textContent = '';

        comprar.append(totalElement);
        comprar.append(estudanteVerificar);
        comprar.append(verificar);
        comprar.append(cupao);
        comprar.append(desconto);
        comprar.append(btn);
        comprar.append(valorFinalElement);
        comprar.append(referenciaElement);

        btn.addEventListener('click', () => {
            const produtosIds = carrinho.map(produto => produto.id);
            const dadosDesconto = {
                products: produtosIds,
                student: verificar.checked,
                coupon: desconto.value,
            };

            fetch('https://deisishop.pythonanywhere.com/buy/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosDesconto),
            })
            .then(response => response.json())
            .then(dados => {
                valorFinalElement.textContent = `Valor final a pagar (com eventuais descontos): ${dados.totalCost} €`;
                referenciaElement.textContent = `Referência de pagamento: ${dados.reference}`;
            })
            .catch(error => {
                console.error('Erro:', error);
                valorFinalElement.textContent = `Erro na compra: ${error.message}`;
                referenciaElement.textContent = '';
            });
        });

        sectionCarrinho.append(comprar);
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
    preco.textContent = `${produto.price.toFixed(2)}€`;

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