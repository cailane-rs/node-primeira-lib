import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto) {
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo';
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

// async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch(erro) {
        trataErro(erro)
    } finally {
        console.log(chalk.yellow('Operação concluída.'));
    }
}

export default pegaArquivo;

// \[[^\[\]]*?\] expressão regular que: pega o nome dos links

// \(https?:\/\/[^\s?#.].[^\s]*\) expressão regular que: pega os links entre parênteses
// \[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\) expressão regular que: pega o nome do link e o link separadamente

