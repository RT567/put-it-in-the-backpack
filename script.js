// Put It In The Backpack. The backpack never changes. The item just disappears.

const toast = document.getElementById('toast');
let hideTimer;

document.querySelectorAll('[data-item]').forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.add('gone');
    item.disabled = true;

    // fresh text each time so screen readers announce it again
    toast.textContent = 'Congratulations! You put an item into the backpack.';
    // restart the slide-up even if it's already showing
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  });
});

// Clothes. Closes.
document.getElementById('clothes').addEventListener('click', () => {
  window.close(); // only works if script opened this tab, so usually a no-op
  setTimeout(() => location.replace('about:blank'), 120);
});
