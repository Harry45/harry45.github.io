---
layout: post
mathjax: true
title:  "Bayesian School 2016"
date:   2017-05-18 08:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Workshop and Conference 
tags:
  - 
  -
excerpt:
description: "Highlights from the 2016 Bayesian School: KL divergence and BHMs."
---

<p align="justify">The 2016 Bayesian School was held at Stellenbosch University from 21 to 25 November. The school focused on three main topics: Introductory Bayesian Methods, Monte Carlo Methods and Advanced Bayesian Methods, the last of which was taught by <a href="http://astro.ic.ac.uk/aheavens/home">Prof. Alan Heavens</a> from Imperial College.</p>

<p align="justify">Beyond the lectures, another interesting part of the school was the "Research Hacks", which allowed participants to meet in small groups, ask questions, exchange ideas and initiate collaborations. The hacks largely served these purposes and also led to the publication of three papers (see <a href="https://arxiv.org/abs/1704.03472">arXiv:1704.03472</a>, <a href="https://arxiv.org/abs/1704.03467">arXiv:1704.03467</a> and <a href="https://arxiv.org/abs/1704.07830">arXiv:1704.07830</a>). </p>

<p align="justify">I learned a great deal from Prof. Heavens' lectures and attempted some of the problems he set during the school. There were also several other interesting lectures on Bayesian methods. Below, I discuss two topics: the KL divergence and Bayesian Hierarchical Modelling.</p>

<h2>Kullback-Leibler (KL) Divergence</h2>
<p align="justify">Suppose we have a prior distribution $\pi\left(\boldsymbol{\theta}\right)$ on the set of parameters $\boldsymbol{\theta}$, which is updated via Bayes' theorem to a posterior distribution $q\left(\boldsymbol{\theta}\right)$. We want to know how much information we have gained from this update. This can be quantified using the Kullback-Leibler (KL) divergence,

\begin{align}
\textrm{D}_{\textrm{KL}}\left(q\left\Vert \pi\right.\right)=\int q\,\textrm{log}\left(\dfrac{q}{\pi}\right)d\theta
\end{align}

also known as the <i>relative entropy</i>. If logarithms are taken to base 2, the information gain is measured in <i>bits</i>; if they are taken to base $e$, it is measured in <i>nats</i>. To illustrate the KL divergence, consider a simple example: two Gaussians. Let the prior and posterior distributions have means $\mu_{1},\,\mu_{2}$ and variances $\sigma_{1}^{2},\,\sigma_{2}^{2}$. The KL divergence of $q$ from $\pi$ is

$$
\textrm{D}\left(q\left\Vert \pi\right.\right)=\dfrac{\left(\mu_{1}-\mu_{2}\right)^{2}}{2\sigma_{1}^{2}}+\dfrac{\sigma_{2}^{2}}{2\sigma_{1}^{2}}-\dfrac{1}{2}-\textrm{log}\left(\dfrac{\sigma_{2}}{\sigma_{1}}\right)
$$

From this result, as the variance of the posterior distribution, $\sigma_{2}^{2}$, decreases, the information content increases; and if the two means differ greatly, the information gain can increase significantly.</p>

<div style="background-color: #FFF8C6; margin-left: 20px; margin-right: 20px; padding-bottom: 8px; padding-left: 8px; padding-right: 8px; padding-top: 8px;">

<p align="justify">Another question on the KL divergence was:</p><br/>

<p align="justify" style="margin-left: 40px; margin-right: 40px"><i>We have an experiment where a single datum $x$ is assumed to be drawn from a Gaussian Likelihood of mean $\mu$ and variance $\sigma^{2}$. Compute the KL divergence between an assumed Gaussian prior on $\mu$ (with mean zero and variance $\Sigma$) and the posterior.</i></p><br/>

For this problem, the KL divergence is given by

$$
\textrm{D}_{\textrm{KL}}\left(q\left\Vert \pi\right.\right)=-\dfrac{1}{2}+\dfrac{\sigma^{2}}{2\left(\Sigma+\sigma^{2}\right)}+\dfrac{x^{2}\Sigma}{2\left(\Sigma+\sigma^{2}\right)^{2}}-\dfrac{1}{2}\textrm{log}\left(\dfrac{\sigma^{2}}{\Sigma+\sigma^{2}}\right)
$$

<p align="justify">Had we naively assumed a Dirac delta prior on the parameter, that is, $\Sigma=0$, then $\textrm{D}_{\textrm{KL}}\left(q\left\Vert \pi\right.\right)=0$, meaning there is no information gain. In my view, this example highlights the importance of incorporating priors in our analyses, which in turn makes the case for the Bayesian formalism.</p>

 
</div>

<h2>Bayesian Hierarchical Modelling</h2>

<p align="justify">This topic helped me answer a question I had long wondered about: how should we perform parameter inference when both the dependent and independent variables have error bars? The idea behind Bayesian Hierarchical Modelling (BHM) is to split the problem into steps, so that the full model consists of a series of sub-models.</p>

<p align="justify">BHM links the sub-models, propagating uncertainties from one to the next. Consider a simple example: fitting a straight line, $y=mx$, to a single data point, $X$ and $Y$. The complication is that both $X$ and $Y$ have errors, $\sigma_{X}$ and $\sigma_{Y}$, respectively. How do we infer $m$? In other words, we want $\mathcal{P}\left(m\left|X,\,Y\right.\right)$.</p>

<div style="background-color: #FFF8C6; margin-left: 20px; margin-right: 20px; padding-bottom: 8px; padding-left: 8px; padding-right: 8px; padding-top: 8px;">

<p align="justify">We now go through the steps of the BHM. We begin with Bayes' theorem:</p>

$$
\mathcal{P}\left(m\left|X,\,Y\right.\right)=\dfrac{\mathcal{P}\left(X,\,Y\left|m\right.\right)\mathcal{P}\left(m\right)}{\mathcal{P}\left(X,\,Y\right)}\propto\mathcal{P}\left(X,\,Y\left|m\right.\right)\mathcal{P}\left(m\right)
$$

<p align="justify">We then introduce the latent variables $x$ and $y$; since we are not interested in them, we marginalise over them:</p>


$$
\mathcal{P}\left(m\left|X,\,Y\right.\right)\propto \int {\color{red}\mathcal{P}\left(X,\,Y,\,x,\,y\left|m\right.\right)}\mathcal{P}\left(m\right)dxdy
$$
 
<p align="justify">Using the product rule, we have</p>


$$
\mathcal{P}\left(m\left|X,\,Y\right.\right)\propto\int{\color{red}\mathcal{P}\left(X,\,Y\left|x,\,y,\,m\right.\right){\color{blue}\mathcal{P}\left(x,\,y\left|m\right.\right)}}\mathcal{P}\left(m\right)dxdy
$$
 
<p align="justify">Here, the first probability does not depend on $m$, that is, $\mathcal{P}\left(X,\,Y\left|x,\,y,\,m\right.\right) = \mathcal{P}\left(X,\,Y\left|x,\,y\right.\right)$ and applying the product rule again gives</p>

$$
\mathcal{P}\left(m\left|X,\,Y\right.\right)\propto\int{\color{red}\mathcal{P}\left(X,\,Y\left|x,\,y\right.\right){\color{blue}{\color{magenta}\mathcal{P}\left(y\left|m,\,x\right.\right)}\mathcal{P}\left(x\left|m\right.\right)}}\mathcal{P}\left(m\right)dxdy
$$
 
<p align="justify">Our model is deterministic, that is, $\mathcal{P}\left(y\left|m,\,x\right.\right) = \delta\left(y-mx\right)$. Therefore,</p>


$$
\mathcal{P}\left(m\left|X,\,Y\right.\right)\propto\int{\color{red}\mathcal{P}\left(X,\,Y\left|x,\,mx\right.\right){\color{magenta}\delta\left(y-mx\right)}{\color{blue}\mathcal{P}\left(x\right)}}\mathcal{P}\left(m\right)dxdy
$$

<p align="justify">Assuming uniform priors $\mathcal{P}\left(x\right)$ and $\mathcal{P}\left(m\right)$, we have</p>

$$
\mathcal{P}\left(m\left|X,\,Y\right.\right)\propto\int{\color{red}\mathcal{P}\left(X,\,Y\left|x,\,mx\right.\right)}\,dx
$$

<p align="justify">We further assume that the sampling distributions of $X$ and $Y$ are known and independent, such that</p>

$$
\mathcal{P}\left(X,\,Y\left|x,\,y\right.\right)=\mathcal{P}\left(X\left|x\right.\right)\mathcal{P}\left(Y\left|y\right.\right)
$$
 
<p align="justify">We also assume that the errors in $X$ and $Y$ are independent and Gaussian, and for simplicity take $\sigma_{X}=\sigma_{Y}=1$. Therefore,</p>

$$
\mathcal{P}\left(m\left|X,\,Y\right.\right)\propto\int e^{-\frac{1}{2}\left(X-x\right)^{2}}e^{-\frac{1}{2}\left(Y-mx\right)^{2}}dx
$$


</div>
<br/>


<p align="justify">Completing the square and performing the integration, the unnormalised posterior distribution of $m$ is</p>

\begin{equation}
\mathcal{P}\left(m\left|X,\,Y\right.\right)\propto\dfrac{1}{\sqrt{1+m^{2}}}e^{-\frac{1}{2}\left(\frac{Y-mX}{\sqrt{1+m^{2}}}\right)^{2}}
\label{eq:post_m}
\end{equation}

<p align="justify">We can also consider the joint posterior distribution of $x$ and $m$, which follows directly from Bayes' theorem:</p>


$$
\mathcal{P}\left(x,\,m\left|X,\,Y\right.\right)\propto\mathcal{P}\left(X,\,Y\left|x,\,mx\right.\right)\mathcal{P}\left(x\right)\mathcal{P}\left(m\right)
$$

\begin{equation}
\mathcal{P}\left(x,\,m\left|X,\,Y\right.\right)\propto e^{-\frac{1}{2}\left(X-x\right)^{2}}e^{-\frac{1}{2}\left(Y-mx\right)^{2}}
\end{equation}

<p align="justify">Consider the case $X=10$ and $Y=15$. The left panel of the figure below shows the posterior distribution of $m$ from Equation \eqref{eq:post_m}, and the right panel shows the joint posterior distribution of $x$ and $m$ obtained with Gibbs sampling.</p>

{% include image.html url="/images/posterior_m.jpg" caption="The left panel shows the posterior distribution of $m$ while the right panel shows the joint posterior distribution of $x$ and $m$ using Gibbs Sampling."  width=800 align="center" %}


 