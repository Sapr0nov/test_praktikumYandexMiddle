<<<<<<< sprint_4
Project from course Yandex - middle Front end developer
It include part of web application - client for chat app.

## Getting Started 🚀

- [Figma](https://www.figma.com/file/ovjYpFJqUreYoOcBK0ixb8/Messenger?node-id=0%3A1)
- [DEMO Netlify](https://sapronovsa.netlify.app/messanger)
- [DEMO Heroku](https://serg-middle-praktikum.herokuapp.com/)
- [404](https://sapronovsa.netlify.app/404/)
- [500](https://sapronovsa.netlify.app/500/)
- [signin](https://sapronovsa.netlify.app/)
- [signup](https://sapronovsa.netlify.app/sign-up)
- [profile](https://sapronovsa.netlify.app/settings)

## Using

**WebPack** **TypeScript** **Node JS** **Express** **PosHTML** **PostCSS** **Pretter** **Linter** **

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

#### linter 

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
