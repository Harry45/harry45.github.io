// Mobile menu and light/dark theme toggle.
(function () {
  var header = document.querySelector('[data-header]');
  var menuButton = document.querySelector('[data-menu-toggle]');
  if (header && menuButton) {
    menuButton.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  var themeButton = document.querySelector('[data-theme-toggle]');
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
})();

// Dropdown groups in the main navigation ("More").
(function () {
  var groups = document.querySelectorAll('[data-nav-group]');
  function closeAll(except) {
    groups.forEach(function (g) {
      if (g === except) return;
      g.classList.remove('is-open');
      var b = g.querySelector('[data-nav-group-toggle]');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  groups.forEach(function (group) {
    var button = group.querySelector('[data-nav-group-toggle]');
    if (!button) return;
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !group.classList.contains('is-open');
      closeAll(group);
      group.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    groups.forEach(function (g) { if (!g.contains(e.target)) closeAll(); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });
})();

// Table of contents for long posts: built from the post's section headings
// (h2, or h1 where a post uses those as sections) when there are at least 3.
(function () {
  var nav = document.querySelector('[data-toc]');
  var source = document.querySelector('[data-toc-source]');
  if (!nav || !source) return;
  var headings = source.querySelectorAll('h2');
  if (headings.length < 3) headings = source.querySelectorAll('h1');
  if (headings.length < 3) return;
  var list = nav.querySelector('ol');
  var used = {};
  headings.forEach(function (h) {
    if (!h.id) {
      var base = h.textContent.trim().toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-') || 'section';
      var id = base, n = 2;
      while (used[id] || document.getElementById(id)) id = base + '-' + n++;
      h.id = id;
    }
    used[h.id] = true;
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent.trim();
    li.appendChild(a);
    list.appendChild(li);
  });
  if (window.matchMedia('(max-width: 720px)').matches) {
    nav.querySelector('details').removeAttribute('open');
  }
  nav.hidden = false;
})();

// "BibTeX" buttons on publications: copy the citation to the clipboard, or
// reveal it for manual copying where the clipboard API is unavailable.
(function () {
  document.querySelectorAll('[data-copy-bibtex]').forEach(function (button) {
    var pre = button.closest('.pub').querySelector('.pub__bibtex');
    if (!pre) return;
    button.addEventListener('click', function () {
      var text = pre.textContent;
      function copied() {
        button.textContent = 'Copied!';
        button.classList.add('is-copied');
        setTimeout(function () { button.textContent = 'BibTeX'; button.classList.remove('is-copied'); }, 1600);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(copied, function () { pre.hidden = !pre.hidden; });
      } else {
        pre.hidden = !pre.hidden;
      }
    });
  });
})();

// Re-apply #section links once the page (and its lazy images) have loaded,
// so links such as /travel/#europe land on the right heading.
window.addEventListener('load', function () {
  if (!location.hash) return;
  var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
});
