import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from "./index.js";

const caminho = process.argv;

function imprimeLista(nomeArquivo, resultado) {
    console.log(chalk.yellow(`Lista de links de: ${nomeArquivo}`), resultado);
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];

    try{
        fs.lstatSync(caminho)
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log(chalk.red('Arquivo ou diretório não existe'));
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista(argumentos[2], resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
            imprimeLista(nomeDeArquivo, lista);
        })
    }
}

processaTexto(caminho);
