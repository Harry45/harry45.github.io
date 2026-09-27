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

<p align="justify">In this post, we focus on calculating the <b>Bayesian Evidence</b>, which can be regarded as the average likelihood under the prior. The evidence is the normalisation integral of the product of the likelihood and the prior. It is also known as the <i>model likelihood</i> or the <i>marginal likelihood</i>, and is denoted by $\mathbb{Z}$. It is interpreted as the probability of the data $\left(\mathcal{D}\right)$ given the model $\left(\mathcal{M}\right)$, and is given by</p>

\begin{equation}
\mathbb{Z}\equiv\mathcal{P}\left(\mathcal{D}\left|\mathcal{M}\right.\right)=\int\mathcal{P}\left(\mathcal{D}\left|\boldsymbol{\theta},\,\mathcal{M}\right.\right)\,\mathcal{P}\left(\boldsymbol{\theta}\left|\mathcal{M}\right.\right)\,d\boldsymbol{\theta}
\end{equation}

<p align="justify">where $\mathcal{P}\left(\mathcal{D}\left|\boldsymbol{\theta},\,\mathcal{M}\right.\right)$ is the likelihood function, which should reflect how the data were obtained, and $\mathcal{P}\left(\boldsymbol{\theta}\left|\mathcal{M}\right.\right)$ is the prior distribution for the parameters. Using Bayes' theorem, we can write

$$
\mathcal{P}\left(\mathcal{M}\left|\mathcal{D}\right.\right)=\dfrac{\mathcal{P}\left(\mathcal{D}\left|\mathcal{M}\right.\right)\mathcal{P}\left(\mathcal{M}\right)}{\mathcal{P}\left(\mathcal{D}\right)}
$$

</p>

<p align="justify">The left-hand side of this equation is the posterior probability of the model given the data. Consider two competing models $\mathcal{M}_{1}$ and $\mathcal{M}_{2}$. The ratio of their posterior probabilities, given the data, is

$$
\dfrac{\mathcal{P}\left(\mathcal{M}_{1}\left|\mathcal{D}\right.\right)}{\mathcal{P}\left(\mathcal{M}_{2}\left|\mathcal{D}\right.\right)}=\dfrac{\mathcal{P}\left(\mathcal{D}\left|\mathcal{M}_{1}\right.\right)}{\mathcal{P}\left(\mathcal{D}\left|\mathcal{M}_{2}\right.\right)}\,\dfrac{\mathcal{P}\left(\mathcal{M}_{1}\right)}{\mathcal{P}\left(\mathcal{M}_{2}\right)}
$$
</p>

<p align="justify">Note that $\mathcal{P}\left(\mathcal{D}\right)$ is a constant and cancels when calculating the ratio of the models' posterior probabilities. The ratio $$B_{12}=\dfrac{\mathcal{P}\left(\mathcal{D}\left|\mathcal{M}_{1}\right.\right)}{\mathcal{P}\left(\mathcal{D}\left|\mathcal{M}_{2}\right.\right)}$$ is the <b>Bayes factor</b>, which is simply the ratio of the models' evidences. The ratio $$\dfrac{\mathcal{P}\left(\mathcal{M}_{1}\left|\mathcal{D}\right.\right)}{\mathcal{P}\left(\mathcal{M}_{2}\left|\mathcal{D}\right.\right)}$$ is the posterior odds while $$\dfrac{\mathcal{P}\left(\mathcal{M}_{1}\right)}{\mathcal{P}\left(\mathcal{M}_{2}\right)}$$ is the prior odds. In words, therefore: 

$$
\textrm{posterior odds}=\textrm{Bayes Factor}\times\textrm{prior odds}
$$
</p>

<p align="justify">With non-committal priors on the models, that is, $\mathcal{P}\left(\mathcal{M}_{1}\right)=\mathcal{P}\left(\mathcal{M}_{2}\right)$, the posterior odds are simply equal to the Bayes factor. As $B_{12}$ increases, so does our belief that model $\mathcal{M}_{1}$ is better than model $\mathcal{M}_{2}$; otherwise, model $\mathcal{M}_{2}$ is preferred. The Bayes factor therefore indicates how the relative odds change in light of new data, irrespective of the prior odds of the models. It is typically interpreted using the Jeffreys' scale (see <a href="http://www.tandfonline.com/doi/abs/10.1080/01621459.1995.10476572">Kass et al., 1995</a>). an empirically determined scale shown in the table below.</p>



<center> 
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>$\textrm{ln }\left(B_{12}\right)$</th><th>$B_{12}$</th><th>Evidence against $\mathcal{M}_{2}$</th></tr></thead><tbody>
 <tr><td align="center">0 to 1</td><td align="center">1 to 3</td><td align="center">Inconclusive</td></tr>
 <tr><td align="center">1 to 3</td><td align="center">3 to 20</td><td align="center">Weak Evidence</td></tr>
 <tr><td align="center">3 to 5</td><td align="center">20 to 150</td><td align="center">Moderate Evidence</td></tr>
 <tr><td align="center">>5</td><td align="center">>150</td><td align="center">Strong Evidence</td></tr>
</tbody></table>
</center>

