import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

// versão assíncrona: promises com then()
 function pegaArquivo(caminhoDoArquivo) {
     const encoding = 'utf-8';
     fs.promises.readFile(caminhoDoArquivo, encoding)
     .then((texto) => console.log(chalk.green(texto)))
     .catch((erro) => trataErro(erro))
 }

// versão síncrona
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if(erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }

pegaArquivo('./arquivos/texto.md');