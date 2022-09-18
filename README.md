<<<<<<< sprint_4
Project from course Yandex - middle Front end developer
It include part of web application - client for chat app.

## Getting Started 🚀

- [Figma](https://www.figma.com/file/ovjYpFJqUreYoOcBK0ixb8/Messenger?node-id=0%3A1)
<<<<<<< HEAD
- [DEMO Netlify](https://sapronovsa.netlify.app/) [![Netlify Status](https://api.netlify.com/api/v1/badges/26d737d3-b550-4c9b-a2e3-d5dd1a8bac0d/deploy-status)](https://app.netlify.com/sites/sapronovsa/deploys)
- [DEMO Heroku](https://serg-middle-praktikum.herokuapp.com/)
=======
- [DEMO](https://sapronovsa.netlify.app/messanger)
>>>>>>> main
- [404](https://sapronovsa.netlify.app/404/)
- [500](https://sapronovsa.netlify.app/500/)
- [signin](https://sapronovsa.netlify.app/)
- [signup](https://sapronovsa.netlify.app/sign-up)
- [profile](https://sapronovsa.netlify.app/settings)

## Using

<<<<<<< HEAD
**WebPack** **Docker** **TypeScript** **Node JS** **Express** **PosHTML** **PostCSS** **Pretter** **Linter** **Handlebars** \*\*
=======
**WebPack** **TypeScript** **Node JS** **Express** **PosHTML** **PostCSS** **Pretter** **Linter** **
>>>>>>> main

## Commands 💬

#### clear cache and user's data

```sh
npm run clean
```

#### build project

```sh
npm run build
```

#### launch server

```sh
npm start
```

<<<<<<< HEAD
#### linter
=======
#### linter 
>>>>>>> main

```sh
npm run lint
```

#### prettier format

```sh
npm run lint:format
```

#### TESTS

```sh
npm run test
```

## Спринт 4

<<<<<<< HEAD
- Настроен `Webpack` в проекте.
- Настроен `loader` для работы с `TypeScript`, препроцессором `postCSS` с `autoprefixer` и шаблонизатором.
- Настроена Docker-сборка статического приложения.
- Размещен в Heroku проект с Docker-сборкой
- Настроен precommit на проект.
- Проведите аудит пакетов и их обновление.
- Обновлен README.md проекта

## TODO

- рефакторинг
- вынос поп меню в отдельный файл
- декомпозиция ApiAction
- настроить limit для webpack
- настроить lazy load webpack
=======
- Переход на `webPack`
  - / — страница входа,
  - /sign-up — страница регистрации,
  - /settings — настройки профиля пользователя,
  - /messenger — чат.
- Внедрено HTTP API чатов
  - Обновление данных профиля
  - Изменение аватара
  - Создание и удаление чата
  - добавление удаление пользователя в чат (правый клик по названию чата)
- Подключена отправка сообщений `WebSocket`
- Используется тестирование с помощью `Mocha`, `Chai`
- Повышен уровень безопастности установлен и настроен `helmet` (contentSecurityPolicy)
- Повышена отказоустойчивость через `express-rate-limit`
- Сборка попрежнему при помощи `Parcel`.

## TODO

- отображение полученных сообщений
- рефакторинг
>>>>>>> main
