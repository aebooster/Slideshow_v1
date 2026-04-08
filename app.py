from pathlib import Path
import html

import gradio as gr

BASE_DIR = Path(__file__).parent


def build_srcdoc() -> str:
    css = (BASE_DIR / "styles.css").read_text(encoding="utf-8")
    js = (BASE_DIR / "app.js").read_text(encoding="utf-8")

    return f"""<!doctype html>
<html lang=\"ru\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>Slide Render UI</title>
    <style>{css}</style>
  </head>
  <body>
    <main class=\"app-shell\">
      <section class=\"preview-panel\">
        <h1>HTML/CSS превью</h1>
        <div class=\"preview-frame\">
          <div id=\"slide-canvas\" class=\"slide-canvas\">
            <img id=\"bg-image\" class=\"bg-image\" alt=\"Background\" />
            <div class=\"overlay-row\">
              <img id=\"app-icon\" class=\"app-icon\" alt=\"App icon\" />
              <div id=\"app-title\" class=\"app-title\">Название приложения</div>
            </div>
          </div>
        </div>
      </section>

      <section class=\"controls-panel\">
        <h2>Редактор слайдов</h2>

        <div class=\"slides-tabs\" id=\"slides-tabs\"></div>

        <div class=\"form-card\">
          <label>
            Фон — ссылка на изображение
            <input id=\"bg-input\" type=\"url\" placeholder=\"https://...\" />
          </label>

          <label>
            Иконка — ссылка на изображение
            <input id=\"icon-input\" type=\"url\" placeholder=\"https://...\" />
          </label>

          <label>
            Название приложения
            <input id=\"title-input\" type=\"text\" placeholder=\"ChatGPT\" maxlength=\"40\" />
          </label>
        </div>

        <div class=\"actions\">
          <button id=\"add-slide\" class=\"btn ghost\" title=\"Добавить новый слайд\">＋ Добавить слайд</button>
          <button id=\"render-zip\" class=\"btn primary\" title=\"Скачать zip с рендерами\">⤓ Рендер в ZIP</button>
        </div>
      </section>
    </main>

    <script src=\"https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js\"></script>
    <script src=\"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js\"></script>
    <script src=\"https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js\"></script>
    <script>{js}</script>
  </body>
</html>
"""


def build_iframe() -> str:
    srcdoc = html.escape(build_srcdoc(), quote=True)
    return (
        "<iframe "
        "style='width:100%;height:96vh;border:0;border-radius:12px;background:#0f1115;' "
        f"srcdoc='{srcdoc}'"
        "></iframe>"
    )


with gr.Blocks(title="Slide Render UI") as demo:
    gr.Markdown("# Slide Render UI for Hugging Face Space")
    gr.HTML(build_iframe())


if __name__ == "__main__":
    demo.launch()
