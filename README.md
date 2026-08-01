# ARTASIMN

Редизайн сайта [artasimn.com](https://artasimn.com/) — статический сайт (HTML/CSS/JS,
без сборки и без зависимостей), готовый к бесплатному деплою на Vercel.

## Страницы

| Файл | Что это |
|---|---|
| `index.html` | Главная. Полноэкранные блоки: большая фотография + колонка товаров. Блок не пролистывается дальше, пока не проскроллены все товары внутри него. Блоки чередуются: фото слева → фото справа. |
| `items.html` | Каталог: секции `Garment` (#garment) и `Jewelry` (#jewelry) сеткой 3 в ряд. |
| `product.html?id=<id>` | Карточка товара: пэкшот, галерея, описание, `ORDER` / `+ADD TO CARD`. |

## Что реализовано

- **Whip Spin / Spatial Spin Transition** — при наведении на фото товара карточка
  быстро проворачивается вокруг вертикальной оси (3D `rotateY` + перспектива), и на
  обороте показывается тот же товар на модели.
- **Кастомные курсоры** — `assets/cursors/default.png` обычный,
  `assets/cursors/pointer.png` на всех кликабельных элементах.
- **Фавикон** — `assets/favicon.svg`, залит белым.
- Выпадающее меню `Items → Garment / Jewelry` в шапке.
- Адаптив: на узких экранах блоки главной раскладываются в обычную вертикальную
  прокрутку.

## Структура

```
index.html  items.html  product.html
css/style.css
js/data.js    — каталог товаров (front / back / gallery)
js/site.js    — шапка и карточки товара
js/home.js    — поблочный скролл главной
assets/       — logo, favicon, icons, cursors, products, models, hero
vercel.json
```

Товары правятся в одном месте — `js/data.js`.

## Локальный запуск

```bash
npx http-server -p 8080
# http://127.0.0.1:8080
```

## Деплой на Vercel

Сборка не нужна — это статика.

1. Импортировать репозиторий на [vercel.com/new](https://vercel.com/new).
2. Framework Preset: **Other**, Build Command — пусто, Output Directory — корень (`.`).
3. Deploy.

Либо из терминала: `npx vercel --prod`.
