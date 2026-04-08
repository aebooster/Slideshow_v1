---
title: Slideshow_v1
emoji: 🖼️
colorFrom: blue
colorTo: purple
sdk: gradio
sdk_version: "4.44.0"
app_file: app.py
pinned: false
---

# Slide Render UI (Gradio Space)

Готовая структура для запуска в Hugging Face Space (SDK: **Gradio**).

## Файлы
- `app.py` — точка входа Space, рендерит интерфейс в `iframe` через `srcdoc`.
- `styles.css` — стили UI/превью.
- `app.js` — логика слайдов, live-preview и экспорт ZIP.
- `requirements.txt` — зависимости для Space.

## Запуск локально
```bash
pip install -r requirements.txt
python app.py
```

## Деплой в Hugging Face Space
1. Создай новый Space с SDK = **Gradio**.
2. Загрузи эти файлы в корень репозитория Space.
3. Дождись билда — приложение стартует автоматически через `app.py`.
