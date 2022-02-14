let readline = require('readline-sync');

let nome = readline.question('Qual seu nome? ');
if (!nome) {
    console.warn('Desculpe, voce precisa se apresentar! Tente novamente');
    return;
}

let idade = readline.questionInt('Qual sua idade: ');
if (idade < 18) {
    console.warn('Apenas maiores de idade pode comprar aqui! Desculpe, chame seu pai...');
    return;
}

let cardapio = ['Pao', 'Pizza', 'Panelada', 'Carne cozida', 'Churrasco'];
let showOpcoes = () => console.log('\nVoce tem as opcoes:\na - incluir item no pedido\nr - remover item\nm - mostrar pedido\nf - finalizar ou cancelar pedido!\n');
let showPedido = () => {
    if (itensPedido.length == 0) {
        console.log('\nNenhum item no pedido\n');
        return;
    }
    console.log('\nSeu pedido\n');
    console.table(itensPedido);
    console.log('');
    //let pedidoConfirmado = itensPedido.map(i => `${i.nome}: ${i.quantidade}`);
    //console.log(`\nSeu pedido\n${pedidoConfirmado.join('\n')}\n`);
};

if (!readline.keyInYN(`${nome}, vamos iniciar um pedido? `)) {
    console.log('bye');
    return;
}

showOpcoes();

let itensPedido = [];

readline.promptCLLoop({
    a: () => {
        let i = readline.keyInSelect(cardapio, 'O que adicionar? ');
        while (i >= 0) {
            let nome = cardapio[i];
            let item = itensPedido.find(i => i.nome == nome);
            if (!item) {
                item = { nome: nome, quantidade: 0 };
                itensPedido.push(item);
            }
            item.quantidade++;
            i = readline.keyInSelect(cardapio, `${item.quantidade} ${nome} no pedido... O que mais adicionar? `);
        }
        showOpcoes();
    },
    r: () => {
        let i = readline.keyInSelect(cardapio, 'O que remover? ');
        while (i >= 0) {
            let nome = cardapio[i];
            let item = itensPedido.find(i => i.nome == nome);
            if (!item || item.quantidade == 0)
                i = readline.keyInSelect(cardapio, `${cardapio[i]} nao esta no pedido! O que quer remover? `);
            else {
                item.quantidade--;
                i = readline.keyInSelect(cardapio, `${item.quantidade || 'Nao tem mais'} ${nome} no pedido... O que mais remover? `);
            }
        }
        showOpcoes();
    },
    m: () => {
        showPedido();
        showOpcoes();
    },
    f: () => {
        if (itensPedido.length > 0) {
            if (readline.keyInYN(`Confirma seu pedido ${nome}? `)) {
                readline.question('Informe sua senha: ', {
                    hideEchoBack: true
                });
                showPedido();
                console.log(`Otimo ${nome}, iremos providenciar para voce!`);
            }
        }
        console.log('bye');
        return true;
    }
});