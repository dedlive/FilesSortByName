/*
скрипт парсит файлы в заданной директории
и на основе имени файла раскидывает файлы в папки и подпапки.
*/
const fs = require('fs')
const from = 'E:/from/'
const to   = 'e:/to/'

let filename, year, month, day
let counter = 1

function makeYMDfolder(path) {
    fs.mkdirSync(path, { recursive: true }, err => {})
}

function moveFile(oldPath, newPath)
{
    console.log(`Перемещаем ${oldPath} в ${newPath}`)
    fs.renameSync(oldPath, newPath, err => {})
}

//Парсер имени файла с определением даты
function parsedFileName(file) {
    /*
    Пример имени файла
    IMG-20201026-WA0013.jpeg
    */
    try {
        [filename, year, month, day] = file.match(   /^\w{3,4}-?_?(\d{4})(\d{2})(\d{2}).*$/   )    
    } catch (err) {}
        if ( /\d{4}/.test(year) && /\d{2}/.test(month) && /\d{2}/.test(day))
    {
        makeYMDfolder(`${to}${year}/${month}/${day}`)
        console.log(`${counter}. Перемещаем ${from}${filename} в ${to}${year}/${month}/${day}/${filename}`)
        fs.renameSync(`${from}${filename}`, `${to}${year}/${month}/${day}/${filename}`)
        counter++
      }
}

  fs.readdir(from, (err, filesList) => {
    filesList.forEach(fileItem => {

    // Создаётся объект promise
    let promise = new Promise((resolve, reject) => {
      parsedFileName(fileItem)      
      resolve();
  });

    })
 })