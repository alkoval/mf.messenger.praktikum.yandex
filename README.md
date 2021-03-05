# [ChatApp](https://cranky-kalam-8c08d4.netlify.app/)

![npm](https://img.shields.io/npm/v/npm)
![Netlify](https://img.shields.io/netlify/2bf9eb43-1995-44c0-869f-8b8b5fa15f26)
![Heroku](https://img.shields.io/badge/heroku-published-brightgreen)
![test](https://img.shields.io/badge/tests-passing-brightgreen)

ChatApp, учебный проект реализованный в рамках прохождения обучения в Яндекс Практикуме.
Отличный способ, чтобы вспомнить если не все, то многое.

Проект подготовлен к спринту 4.

Для тестирования использовались библиотеки:

- Mocha
- Chai
- Sinon

Команды:

- `npm run build` - сборка проекта
- `npm run scss` - компиляция src/css в static/css/app.css
- `npm run checkPathImport` - добавить \*.js в конце тегов import
- `npm run start` - запуск локального сервера
- `npm run webpack` - сборка проекта с помощью webpack
- `npm run lint` - форматирование кода eslint + prettier
- `npm run test` - запуск тестов

Добавлена библиотека husky с хуком для git commit(автоматический запуск тестов и линтера).

[Ознакомиться с макетом можно тут](https://www.figma.com/file/ngDS5gdAZj27wZVaUYWCa8/Chat?node-id=0%3A1).

## Проект в Netlify

- ChatApp [login](https://cranky-kalam-8c08d4.netlify.app/)

## Проект в Heroku

- ChatApp [login](https://ya-chatapp.herokuapp.com/)
