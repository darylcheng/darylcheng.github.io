/* GitHub contribution heatmap — last WEEKS weeks.
   Data via the public github-contributions-api (jogruber.de), which
   already buckets each day into GitHub's 0–4 intensity levels. The
   swatch colours are pure CSS (see .heatmap in style.css); this file
   only trims the window and lays days out into week columns. */

(function () {
  var USER = "darylcheng";
  var WEEKS = 26; // ~6 months; set to 13 for ~3, 53 for the full year
  var API = "https://github-contributions-api.jogruber.de/v4/" + USER + "?y=last";

  var mount = document.querySelector(".heatmap");
  if (!mount) return;

  fetch(API)
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      render(data.contributions || []);
    })
    .catch(function () {
      mount.hidden = true;
    });

  function render(all) {
    if (!all.length) {
      mount.hidden = true;
      return;
    }

    // Keep the last WEEKS weeks, starting the window on a Sunday.
    var days = all.slice(-WEEKS * 7);
    var lead = new Date(days[0].date + "T00:00:00").getDay();
    days = days.slice(lead);

    var grid = document.createElement("div");
    grid.className = "heatmap-grid";
    days.forEach(function (d) {
      grid.appendChild(cell(d));
    });

    var total = document.createElement("p");
    total.className = "heatmap-total";
    var count = days.reduce(function (n, d) { return n + d.count; }, 0);
    var months = Math.round((days.length / 7) / 4.345);
    total.textContent = count.toLocaleString() +
      " contributions in the last " + months + " months";

    mount.appendChild(grid);
    mount.appendChild(total);
  }

  function cell(d) {
    var el = document.createElement("span");
    el.className = "heatmap-day";
    el.dataset.level = d.level;
    el.title = d.count + (d.count === 1 ? " contribution" : " contributions") +
      " on " + d.date;
    return el;
  }
})();
