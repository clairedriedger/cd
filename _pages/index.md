---
layout: home
title: Welcome
permalink: /
---
<p style="text-align: center;">
    Welcome to my website. Can you guess the location of this plot?
</p>

<div style="width:100%; max-width:1600px; height:450px; margin:0 auto;">
  {% include interactive_mt_royal_plot.html %}
</div>

<script>
  window.addEventListener('resize', function() {
    var plots = document.querySelectorAll('[id^="plotly"]');  // targets Plotly plots in _includes
    plots.forEach(function(plot) {
      Plotly.Plots.resize(plot);
    });
  });
</script>