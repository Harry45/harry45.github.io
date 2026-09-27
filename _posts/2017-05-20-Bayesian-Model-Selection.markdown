---
layout: post
mathjax: true
title:  "Bayesian Model Selection"
date:   2017-05-20 06:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  - 
  -
excerpt:
extra_css: |
  table {width: 53%;}
description: "Bayesian evidence, Bayes factors and Occam's razor in model selection."
---
<p align="justify">Any given data set can, in principle, be explained by many different models. One of the key questions underlying science is that of model selection: how do we choose between competing theories that purport to explain the observed data? The great paradigm shifts in science fall squarely within this domain. With so many models available, overfitting remains a real concern, which makes choosing the most suitable model essential in statistics.</p>

<p align="justify">In the context of astronomy - as with most areas of science - the next two decades will see a massive increase in data volume through large surveys such as the Square Kilometre Array (SKA) and the Large Synoptic Survey Telescope (LSST). Robust statistical analysis to perform model selection at scale will be a critical factor in the success of such future surveys.</p>

<p align="justify">Even with very good data, we may not know when to stop fitting. Two competing models may fit the data equally well, so how do we choose the more appropriate one? The answer is to prefer the simpler model, a principle known as <i>Occam’s razor</i>. A complex model that explains the data only slightly better than a simpler one should be penalised for the additional parameters it introduces, since extra parameters reduce predictive power. In this context, Bayesian model selection is becoming an increasingly important tool for determining whether the introduction of a new parameter is justified by the data.</p>

<p align="justify">In this post, we focus on the <b>Bayesian evidence</b>, also known as the <i>model likelihood</i> or the <i>marginal likelihood</i>, and denoted by $\mathcal{Z}$. It is the probability of the data, $\mathcal{D}$, given a model, $\mathcal{M}$, and is obtained by averaging the likelihood over the prior:</p>

$$
\mathcal{Z} = \mathcal{P}(\mathcal{D}\,|\,\mathcal{M}) = \int \mathcal{P}(\mathcal{D}\,|\,\boldsymbol{\theta},\,\mathcal{M})\,\mathcal{P}(\boldsymbol{\theta}\,|\,\mathcal{M})\,d\boldsymbol{\theta}
$$

<p align="justify">This averaging is what builds Occam's razor into the evidence. A model with many parameters, or with very broad priors, spreads its predictions over a wide range of possible datasets, so it assigns relatively little probability to the one we actually observed. It is rewarded only if its extra flexibility improves the fit enough to compensate.</p>

<p align="justify">To compare two models, $\mathcal{M}_{1}$ and $\mathcal{M}_{2}$, we apply Bayes' theorem to the models themselves. The ratio of their posterior probabilities splits neatly into two parts:</p>

$$
\textrm{posterior odds} = \textrm{Bayes factor} \times \textrm{prior odds}
$$

<p align="justify">The prior odds express how much we favoured one model over the other before seeing the data. The <b>Bayes factor</b>, $B_{12}$, is simply the ratio of the two evidences, and captures how the data change those odds. With non-committal priors on the models, the posterior odds equal the Bayes factor. The larger $B_{12}$, the stronger our belief that $\mathcal{M}_{1}$ is the better model; if $B_{12}$ is below one, $\mathcal{M}_{2}$ is preferred. The Bayes factor is typically interpreted using the Jeffreys scale (see <a href="https://www.tandfonline.com/doi/abs/10.1080/01621459.1995.10476572">Kass et al., 1995</a>), an empirically determined scale shown in the table below.</p>

<center> 
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>$\textrm{ln }\left(B_{12}\right)$</th><th>$B_{12}$</th><th>Evidence against $\mathcal{M}_{2}$</th></tr></thead><tbody>
 <tr><td align="center">0 to 1</td><td align="center">1 to 3</td><td align="center">Inconclusive</td></tr>
 <tr><td align="center">1 to 3</td><td align="center">3 to 20</td><td align="center">Weak Evidence</td></tr>
 <tr><td align="center">3 to 5</td><td align="center">20 to 150</td><td align="center">Moderate Evidence</td></tr>
 <tr><td align="center">>5</td><td align="center">>150</td><td align="center">Strong Evidence</td></tr>
</tbody></table>
</center>

