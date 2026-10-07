// Use image aspect ratios to pack the curated order into the shortest column.
// Dimensions are known before loading, so the layout stays stable.
(() => {
  const galleries = [...document.querySelectorAll('.gallery')];
  function layout(gallery) {
    const viewport = window.innerWidth;
    const count = viewport <= 440 ? 1 : viewport <= 1100 ? 2 : 3;
    const gap = viewport <= 760 ? 14 : 18;
    const width = (gallery.clientWidth - gap * (count - 1)) / count;
    const heights = Array(count).fill(0);
    gallery.classList.add('masonry');
    for (const card of gallery.children) {
      const img = card.querySelector('img');
      const height = width * Number(img.getAttribute('height')) / Number(img.getAttribute('width'));
      const column = heights.indexOf(Math.min(...heights));
      Object.assign(card.style, {width: `${width}px`, left: `${column * (width + gap)}px`, top: `${heights[column]}px`});
      heights[column] += height + gap;
    }
    gallery.style.height = `${Math.max(0, ...heights) - gap}px`;
  }
  const observer = new ResizeObserver(entries => {
    for (const {target} of entries) {
      if (target.dataset.layoutWidth !== String(target.clientWidth)) {
        target.dataset.layoutWidth = String(target.clientWidth);
        layout(target);
      }
    }
  });
  window.addEventListener('resize', () => galleries.forEach(layout));
  galleries.forEach(gallery => { layout(gallery); observer.observe(gallery); });
})();
