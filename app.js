const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1695904078082-15d3f6ad824c?auto=format&fit=crop&w=1200&q=80',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    title: 'ChatGPT',
  },
];

let selectedIndex = 0;

const tabs = document.getElementById('slides-tabs');
const bgInput = document.getElementById('bg-input');
const iconInput = document.getElementById('icon-input');
const titleInput = document.getElementById('title-input');

const bgImage = document.getElementById('bg-image');
const appIcon = document.getElementById('app-icon');
const appTitle = document.getElementById('app-title');

function selectedSlide() {
  return slides[selectedIndex];
}

function syncInputs() {
  const slide = selectedSlide();
  bgInput.value = slide.bg;
  iconInput.value = slide.icon;
  titleInput.value = slide.title;
}

function renderTabs() {
  tabs.innerHTML = '';
  slides.forEach((_, index) => {
    const button = document.createElement('button');
    button.className = `slide-tab ${index === selectedIndex ? 'active' : ''}`;
    button.textContent = `Слайд ${index + 1}`;
    button.onclick = () => {
      selectedIndex = index;
      refresh();
    };
    tabs.appendChild(button);
  });
}

function refreshPreview() {
  const slide = selectedSlide();
  bgImage.src = slide.bg;
  appIcon.src = slide.icon;
  appTitle.textContent = slide.title || 'Название приложения';
}

function refresh() {
  renderTabs();
  syncInputs();
  refreshPreview();
}

function bindInput(input, key) {
  input.addEventListener('input', (event) => {
    selectedSlide()[key] = event.target.value.trim();
    refreshPreview();
  });
}

bindInput(bgInput, 'bg');
bindInput(iconInput, 'icon');
bindInput(titleInput, 'title');

document.getElementById('add-slide').addEventListener('click', () => {
  const current = selectedSlide();
  slides.push({ ...current });
  selectedIndex = slides.length - 1;
  refresh();
});

async function renderSlideToBlob(slide) {
  const frame = document.getElementById('slide-canvas');
  const previous = { ...selectedSlide() };

  selectedSlide().bg = slide.bg;
  selectedSlide().icon = slide.icon;
  selectedSlide().title = slide.title;
  refreshPreview();

  await new Promise((resolve) => setTimeout(resolve, 120));

  const canvas = await html2canvas(frame, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });

  selectedSlide().bg = previous.bg;
  selectedSlide().icon = previous.icon;
  selectedSlide().title = previous.title;
  refreshPreview();

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

document.getElementById('render-zip').addEventListener('click', async () => {
  const zip = new JSZip();
  const originalIndex = selectedIndex;

  for (let i = 0; i < slides.length; i += 1) {
    selectedIndex = i;
    refresh();
    const blob = await renderSlideToBlob(slides[i]);
    zip.file(`slide-${String(i + 1).padStart(2, '0')}.png`, blob);
  }

  selectedIndex = originalIndex;
  refresh();

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'slides-render.zip');
});

refresh();
