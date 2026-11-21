const zoomLevels = [1, 1.25, 1.5, 1.75, 2];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function getPreviewPhotos({ image, alt, views = [] }) {
  return [{ label: 'Full photo', image, alt }, ...views];
}

// The image's layout size excludes transforms, so the bounds stay stable while panning.
export function panLimit(photoSize, stageSize, scale) {
  return Math.max(0, (photoSize * scale - stageSize) / 2);
}

export function setupPhotoPreview(dialog) {
  const $ = (selector) => dialog.querySelector(selector);
  const stage = $('#preview-stage');
  const title = $('#preview-title');
  const angles = $('#preview-angles');
  const level = $('#preview-zoom-level');
  const zoomOut = $('[data-preview-zoom="-1"]');
  const zoomIn = $('[data-preview-zoom="1"]');
  const hint = $('#preview-instructions');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const photo = new Image();
  photo.className = 'preview-photo';
  photo.draggable = false;
  stage.append(photo);

  let photos = [];
  let angle = 0;
  let zoom = 0;
  let panX = 0;
  let panY = 0;
  let tiltX = 0;
  let tiltY = 0;
  let drag = null;
  let opener;

  function transformPhoto() {
    const scale = zoomLevels[zoom];
    const maxX = panLimit(photo.offsetWidth, stage.clientWidth, scale);
    const maxY = panLimit(photo.offsetHeight, stage.clientHeight, scale);
    panX = clamp(panX, -maxX, maxX);
    panY = clamp(panY, -maxY, maxY);
    photo.style.transform = `translate(${panX}px, ${panY}px) scale(${scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }

  function updateControls() {
    const available = photo.hasAttribute('data-style-photo');
    const ready = available && photo.complete && photo.naturalWidth > 0;
    const gesture = !ready ? 'none' : zoom > 0 ? 'pan' : motion.matches ? 'none' : 'tilt';
    stage.dataset.gesture = gesture;
    zoomOut.setAttribute('aria-disabled', String(!ready || zoom === 0));
    zoomIn.setAttribute('aria-disabled', String(!ready || zoom === zoomLevels.length - 1));
    const percentage = `${zoomLevels[zoom] * 100}%`;
    if (level.value !== percentage) level.value = percentage;
    hint.textContent = !available ? 'This photo is unavailable.'
      : !ready ? 'Loading photo…'
      : gesture === 'pan' ? 'Drag or use the arrow keys to pan around the photo.'
      : gesture === 'tilt' ? 'Drag or use the arrow keys to tilt the photo. Zoom in to see details.'
      : 'Use the zoom controls to see details.';
  }

  function endDrag() {
    const pointerId = drag?.pointerId;
    drag = null;
    stage.classList.remove('is-dragging');
    if (pointerId !== undefined && stage.hasPointerCapture(pointerId)) stage.releasePointerCapture(pointerId);
    tiltX = tiltY = 0;
    transformPhoto();
  }

  function resetView() {
    zoom = panX = panY = 0;
    endDrag();
    updateControls();
  }

  function chooseAngle(index) {
    const current = photos[index];
    angle = index;
    photo.alt = current.alt;
    photo.setAttribute('data-style-photo', '');
    photo.src = current.image;
    [...angles.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === angle)));
    resetView();
  }

  function changeZoom(step) {
    const control = step > 0 ? zoomIn : zoomOut;
    if (control.getAttribute('aria-disabled') === 'true') return;
    const next = clamp(zoom + step, 0, zoomLevels.length - 1);
    const factor = zoomLevels[next] / zoomLevels[zoom];
    panX *= factor;
    panY *= factor;
    zoom = next;
    endDrag();
    updateControls();
  }

  dialog.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-preview-angle')) {
      const index = Number(button.dataset.previewAngle);
      if (index !== angle) chooseAngle(index);
    } else if (button.hasAttribute('data-preview-zoom')) changeZoom(Number(button.dataset.previewZoom));
    else if (button.hasAttribute('data-preview-reset')) resetView();
  });

  stage.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0 || stage.dataset.gesture === 'none') return;
    drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, panX, panY };
    stage.setPointerCapture(event.pointerId);
    stage.classList.add('is-dragging');
  });
  stage.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (stage.dataset.gesture === 'pan') {
      panX = drag.panX + dx;
      panY = drag.panY + dy;
    } else if (stage.dataset.gesture === 'tilt') {
      tiltX = clamp(-dy / 6, -12, 12);
      tiltY = clamp(dx / 6, -20, 20);
    }
    transformPhoto();
  });
  for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    stage.addEventListener(event, ({ pointerId }) => { if (drag?.pointerId === pointerId) endDrag(); });
  }

  const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  stage.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === '+' || event.key === '=') changeZoom(1);
    else if (event.key === '-') changeZoom(-1);
    else if (event.key === 'Home') resetView();
    else if (Object.hasOwn(arrows, event.key) && stage.dataset.gesture !== 'none') {
      const [x, y] = arrows[event.key];
      if (zoom > 0) {
        panX -= x * 36;
        panY -= y * 36;
      } else {
        tiltX = clamp(tiltX - y * 4, -12, 12);
        tiltY = clamp(tiltY + x * 4, -20, 20);
      }
      transformPhoto();
    } else return;
    event.preventDefault();
  });

  // The storefront also handles the placeholder swap for this image.
  photo.addEventListener('load', () => { transformPhoto(); updateControls(); });
  photo.addEventListener('error', updateControls);
  window.addEventListener('resize', () => { if (dialog.open) transformPhoto(); });
  motion.addEventListener('change', () => { endDrag(); updateControls(); });
  dialog.addEventListener('close', () => {
    endDrag();
    opener?.focus({ preventScroll: true });
    opener = null;
  });

  return (product, trigger) => {
    if (dialog.open) return;
    opener = trigger;
    photos = getPreviewPhotos(product);
    title.textContent = product.name;
    angles.hidden = photos.length < 2;
    angles.replaceChildren(...(angles.hidden ? [] : photos.map(({ label }, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'button button-outline preview-angle';
      button.dataset.previewAngle = index;
      button.textContent = label;
      return button;
    })));
    chooseAngle(0);
    dialog.showModal();
    dialog.scrollTop = 0;
    updateControls();
  };
}
