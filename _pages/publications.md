---
layout: page
mathjax: true
title: Publications
permalink: /publications/
---

<p align="justify">His academic research, at the University of Oxford and Imperial College London, focused on building emulators for weak lensing analyses. Traditional Markov Chain Monte Carlo (MCMC) methods require a large number of computationally expensive forward simulations to obtain reliable posterior distributions for both cosmological and systematic parameters. While <b>neural networks</b> were explored in early work, his main focus has been on <b>Gaussian Processes</b>, which allow uncertainty to be propagated fully through the likelihood analysis. He has also worked with the MOPED compression algorithm (<a href="https://academic.oup.com/mnras/article/317/4/965/1039456">Heavens et al. 2000</a>), showing that, combined with a Gaussian Process emulator, it recovers the full posterior distribution of cosmological and nuisance parameters.</p>

<p align="justify">More broadly, he is interested in machine learning and deep learning from a probabilistic perspective. He believes uncertainty quantification will be a central theme of machine learning research over the coming decade. And while "curve-fitting" techniques have been highly successful over the past two decades, there remains a clear need to understand and interpret these algorithms.</p>

## Papers and preprints

<div class="pub-filter" role="group" aria-label="Filter publications" data-pub-filter hidden>
  <button type="button" data-filter="all" aria-pressed="true">All</button>
  <button type="button" data-filter="selected" aria-pressed="false">&#9733; Selected</button>
</div>

<ol class="pub-list">
{% for pub in site.data.publications %}
  {% include publication.html pub=pub %}
{% endfor %}
</ol>
