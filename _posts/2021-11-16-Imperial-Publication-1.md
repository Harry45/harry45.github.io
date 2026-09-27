---
layout: post
mathjax: true
title:  "Parameter Inference with MOPED and Gaussian Processes"
date:   2021-11-16 07:11:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  - 
  -
excerpt:
description: "Compressing weak lensing data with MOPED and emulating it with GPs."
---


<p align="justify">In this post, I briefly summarise my first PhD paper, published in <a href="https://academic.oup.com/mnras/article/497/2/2213/5873022">MNRAS</a> during my PhD. A key step in this work is the compression and emulation of the MOPED coefficients. MOPED, an algorithm developed by <a href="https://academic.oup.com/mnras/article/317/4/965/1039456">Heavens et al. 2000</a>, compresses a data vector of size $N$ to just $p$ numbers, where $p$ is the number of parameters in the model. The first and subsequent MOPED vectors are given, respectively, by</p>

\begin{align}
\mathbf{b}\_{1}=\frac{\mathbf{C}^{-1}\mathbf{\mu}\_{,1}}{\sqrt{\mathbf{\mu}\_{,1}^{\textrm{T}}\mathbf{C}^{-1}\mathbf{\mu}\_{,1}}}
\end{align}

<p align="justify">and</p>

\begin{align}
\mathbf{b}\_{\alpha}=\frac{\mathbf{C}^{-1}\mathbf{\mu}\_{,\alpha}-\sum_{\beta=1}^{\alpha-1}(\mathbf{\mu}\_{,\alpha}^{\textrm{T}}\mathbf{b}\_{\beta})\mathbf{b}\_{\beta}}{\sqrt{\mathbf{\mu}\_{,\alpha}^{\textrm{T}}\mathbf{C}^{-1}\mathbf{\mu}\_{,\alpha}-\sum_{\beta=1}^{\alpha-1}(\mathbf{\mu}\_{,\alpha}^{\textrm{T}}\mathbf{b}\_{\beta})^{2}}}\;\;(\alpha>1).
\end{align}


<p align="justify"> The weighting vector, $\mathbf{b}$, captures as much information as possible about a specific model parameter $\mathbf{\theta}_{\alpha}$. It is used to form a linear combination of the data, $\mathbf{d}$, such that the compressed data are</p>

\begin{align}
y\_{\alpha}\equiv\mathbf{b}^{\textrm{T}}\_{\alpha}\mathbf{d}
\end{align}


<p align="justify">and the expected theoretical prediction is simply $y_{\alpha}\equiv\mathbf{b}^{\textrm{T}}_{\alpha}\mathbf{\mu}$. An MCMC algorithm can then be used to sample the posterior distribution of the model parameters from the MOPED-compressed data. Since the MOPED vectors are mutually orthogonal and normalised, the log-likelihood is simply</p>

\begin{align}
\textrm{log}\,\mathcal{L} = -\frac{1}{2}\sum\_{\alpha=1}^{p}(y\_{\alpha}-\mathbf{b}\_{\alpha}^{\textrm{T}}\mathbf{\mu})^{2}  + \textrm{constant}
\end{align}

<p align="justify">However, computing the MOPED coefficients at each step of an MCMC can be costly when the forward model itself is expensive. We therefore first generate a training set of $N$ Latin Hypercube samples (LHS), compute the MOPED coefficients at these points, and then model them with $p$ separate Gaussian Processes. These serve as surrogates for sampling the posterior distribution of the model parameters, with the result shown in the figure below: the posterior obtained with the full, accurate solver CLASS is shown in tan, and the posterior obtained with the emulator in blue. The contours correspond to the 68% and 95% credible intervals.</p>

{% include image.html url="/images/triangle_plot_derived_sigma_8_semi_gp_maximin_1000_7D.jpg" caption="The full posterior distribution of all parameters using the MOPED compression scheme."  width=800 align="center" %}

