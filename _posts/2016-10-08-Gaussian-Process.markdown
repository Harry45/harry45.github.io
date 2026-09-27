---
layout: post
mathjax: true
title:  "An Introduction to Gaussian Processes"
date:   2016-10-08 12:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  - 
  -
excerpt:
description: "How Gaussian Processes do regression, with and without noise."
---
<p align="justify">In simple terms, a Gaussian Process (GP) can be thought of as a distribution over functions. It is a supervised machine learning technique developed to solve regression problems (<a href="https://en.wikipedia.org/wiki/Gaussian_process">Wikipedia</a>). A key advantage of GPs is that they do not require a "parametric model" to fit the data; instead, they learn using the kernel trick. For an introduction to these techniques, I recommend the excellent review by Prof Zoubin Ghahramani, <a href="http://www.nature.com/nature/journal/v521/n7553/full/nature14541.html">Probabilistic Machine Learning and Artificial Intelligence </a>. Other excellent books on GPs include <a href="http://www.gaussianprocess.org/gpml/">Gaussian Processes for Machine Learning </a> by Carl Edward Rasmussen and Christopher K. I. Williams, and <a href="https://mitpress.mit.edu/books/machine-learning-0">Machine Learning - A Probabilistic Perspective</a> by Kevin Murphy. Before explaining what a GP is, it is useful to review how to find the marginals and conditionals of a multivariate normal distribution (see Chapter 4 of Kevin Murphy's book).</p>

<h2>Marginals and Conditionals</h2>

<p align="justify">Consider a 2D Gaussian distribution with parameters</p>

\begin{align}
\boldsymbol{\mu}=\left(\begin{matrix}
\mu_{1} \cr
\mu_{2}
\end{matrix}\right)\hspace{3cm}\boldsymbol{\Sigma}=\left(\begin{matrix}
\Sigma_{11} & \Sigma_{12}\cr
\Sigma_{21} & \Sigma_{22}
\end{matrix}\right)
\end{align}

<p align="justify">The joint distribution of $x_{1}$ and $x_{2}$, $\mathcal{P}\left(x_{1},\,x_{2}\right)$, can then be written as</p>

\begin{align}
\mathcal{P}\left(x_{1},\,x_{2}\right)=\dfrac{1}{\left|2\pi\boldsymbol{\Sigma}\right|^{\frac{1}{2}}}\,\textrm{exp}\left[-\dfrac{1}{2}\left(\mathbf{x}-\boldsymbol{\mu}\right)^{\textrm{T}}\boldsymbol{\Sigma}^{-1}\left(\mathbf{x}-\boldsymbol{\mu}\right)\right]
\label{eq:2d_gaussian}
\end{align}

<p align="justify">Using $\mathcal{P}\left(x_{1},\,x_{2}\right)=\mathcal{P}\left(x_{1}\left|x_{2}\right.\right)\mathcal{P}\left(x_{2}\right)$, it can be shown that the conditional $\mathcal{P}\left(x_{1}\left|x_{2}\right.\right)$  is also Gaussian, with mean and variance given by</p>

\begin{align}
\mu_{1\left|2\right.}=\mu_{1}+\Sigma_{12}\Sigma_{22}^{-1}\left(x_{2}-\mu_{2}\right)\hspace{3cm}\Sigma_{1\left|2\right.}=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
\label{eq:marginals}
\end{align}

<p align="justify">such that</p>

\begin{align}
\mathcal{P}\left(x_{1}\left|x_{2}\right.\right)=\dfrac{1}{\sqrt{2\pi\Sigma_{1\left|2\right.}}}\,\textrm{exp}\left[-\dfrac{1}{2}\left(\dfrac{x_{1}-\mu_{1\left|2\right.}}{\Sigma_{1\left|2\right.}}\right)^{2}\right]
 \label{eq:marginals_distribution}
\end{align}

<p align="justify">Intuitively, this follows from the fact that taking a slice through a 2D multivariate normal distribution, as shown in the picture below, yields another Gaussian distribution.</p>

<p align="center"><img src="/images/2D-Gaussian.png" alt="2D Gaussian Distribution" width="60%" height="60%"></p>

<h2>GP for Regression</h2>

<p align="justify">In Bayesian parameter inference, where we have a parametric model $\mathcal{M}$ and some data $\mathcal{D}$, we want to infer the posterior distribution of the parameters, $\mathcal{P}\left(\boldsymbol{\theta}\left|\mathcal{M},\,\mathcal{D}\right.\right)$. A GP, by contrast, defines a prior over the functions themselves, which can be updated to a posterior given some data $\mathcal{D}$. In this section, we show how to use the properties above to predict the likely value of a function at a given $x_{*}$. Our main assumption is that the test data come from the same distribution as the training data.</p>

<h4><b>Noise-Free Case</b></h4>

<p align="justify">Suppose we have a set of data, $\mathcal{D}=\left\{ \left(x_{i},\,f_{i}\right)\right\}$ for $i=1,2,3,\ldots N$, where $f$ is assumed to be observed without noise. Given $x_{*}$, we would like to predict $f_{*}$ as well as its variance, $\Sigma_{*}$. In effect, we want the posterior distribution of $f_{*}$ given $x_{*}$, $x$ and $f$. Using Bayes' theorem, we can write</p>

\begin{align}
\mathcal{P}\left(\mathbf{f}\left|\mathbf{y},\,\mathbf{X}\right.\right)=\dfrac{\mathcal{P}\left(\mathbf{y}\left|\mathbf{X},\,\mathbf{f}\right.\right)\mathcal{P}\left(\mathbf{f}\left|\mathbf{X}\right.\right)}{\mathcal{P}\left(\mathbf{y}\left|\mathbf{X}\right.\right)}
\label{eq:BayesTheorem}
\end{align}

<p align="justify">where $\mathcal{P}\left(\mathbf{f}\left|\mathbf{y},\,\mathbf{X}\right.\right)$ is the posterior distribution of the function, $\mathcal{P}\left(\mathbf{f}\left|\mathbf{X}\right.\right)$ is the prior, $\mathcal{P}\left(\mathbf{y}\left|\mathbf{X},\,\mathbf{f}\right.\right)$ is the likelihood and $\mathcal{P}\left(\mathbf{y}\left|\mathbf{X}\right.\right)$ is the marginal likelihood, given by</p>

\begin{align}
\mathcal{P}\left(\mathbf{y}\left|\mathbf{X}\right.\right)=\int\mathcal{P}\left(\mathbf{y}\left|\mathbf{X},\,\mathbf{f}\right.\right)\mathcal{P}\left(\mathbf{f}\left|\mathbf{X}\right.\right)d\mathbf{f}
\label{eq:marginal_likelihood}
\end{align}

<p align="justify">Given a new input $x_{*}$, the posterior distribution of $f_{*}$ is obtained by marginalisation:</p>

\begin{align}
\mathcal{P}\left(y_{\ast}\left|\mathbf{y},\,\mathbf{X},\,x_{\ast}\right.\right)=\int\mathcal{P}\left(y_{\ast}\left|\mathbf{f},\,x_{\ast}\right.\right)\mathcal{P}\left(\mathbf{f}\left|\mathbf{y},\,\mathbf{X}\right.\right)\,d\mathbf{f}
\end{align}

<p align="justify">The prior on the regression function is a Gaussian Process, denoted by</p>

\begin{align}
f\left(\mathbf{X}\right)\sim\textrm{GP}\left(\boldsymbol{\mu}\left(\mathbf{X}\right),\,\kappa\left(\mathbf{X},\,\mathbf{X}'\right)\right)
\label{definition_gp}
\end{align}

<p align="justify">where $\boldsymbol{\mu}\left(\mathbf{X}\right)$ is the mean of the function while $\kappa\left(\mathbf{X},\,\mathbf{X}'\right)$ is the covariance matrix, constructed using a kernel. In this example, we use the squared-exponential kernel,</p>

\begin{align}
\kappa\left(x,\,x'\right)=\sigma^{2}\,\textrm{exp}\left(-\dfrac{\left(x-x'\right)^{2}}{2\ell^{2}}\right)
\label{squared_exponential}
\end{align}

<p align="justify">where $\ell$ and $\sigma$ control the horizontal and vertical variations, respectively. The kernel encodes the correlation between two data points. Ideally, if two data points are close to each other, that is, $x-x'\approx0$, we expect a strong correlation, whereas if $x-x'\rightarrow\infty$, the correlation between $x$ and $x'$ should be minimal. The kernel trick makes this easy to implement. Many other kernel types exist (for more details, see <a href="http://www.gaussianprocess.org/gpml/">Gaussian Processes for Machine Learning </a> by Carl Edward Rasmussen and Christopher K. I. Williams)</p>

\begin{align}
\kappa\left(x,\,x'\right)=\begin{cases}
\begin{matrix}
\sigma^{2}\cr
0
\end{matrix} & \begin{matrix}
x-x'=0\cr
x-x'\rightarrow\infty
\end{matrix}\end{cases}
\end{align}

<p align="justify">For the regression problem, the joint distribution is given by

$$
\left(\begin{matrix}
\mathbf{f}\cr
\mathbf{f}_{\ast}
\end{matrix}\right)\sim\left(\left(\begin{matrix}
\boldsymbol{\mu}\cr
\boldsymbol{\mu}_{\ast}
\end{matrix}\right),\,\left(\begin{matrix}
\mathbf{K} & \mathbf{k}_{\ast}\cr
\mathbf{k}_{\ast}^{\textrm{T}} & k_{\ast\ast}
\end{matrix}\right)\right)
$$
</p>

<p align="justify">where $k_{**} = \kappa\left(\mathbf{X}_{*},\,\mathbf{X}_{*}\right)$. Using the results in Equation \eqref{eq:marginals}, the posterior distribution $\mathcal{P}\left(f_{*}\left|\mathbf{y},\,\mathbf{X},\,x_{*}\right.\right)$ is simply

$$
\mathcal{P}\left(\mathbf{f}\left|\mathbf{X}_{*},\,\mathbf{X},\,\mathbf{f}\right.\right)=\mathcal{N}\left(\mathbf{f}_{*}\left|\boldsymbol{\mu}_{*},\,\boldsymbol{\Sigma}_{*}\right.\right)
$$

where

$$
\boldsymbol{\mu}_{*}=\boldsymbol{\mu}\left(\mathbf{X}_{*}\right)+\mathbf{k}_{*}^{\textrm{T}}\mathbf{K}^{-1}\left(\mathbf{f}-\boldsymbol{\mu}\left(\mathbf{X}\right)\right)
$$

$$
\boldsymbol{\Sigma}_{*}=k_{**}-\mathbf{k}_{*}^{\textrm{T}}\mathbf{K}^{-1}\mathbf{k}_{*}
$$

We typically assume a zero mean function, and the kernel must be <a href="https://en.wikipedia.org/wiki/Positive-definite_matrix">positive definite</a>. Hence,

$$
\boldsymbol{\mu}_{*}=\mathbf{k}_{*}^{\textrm{T}}\mathbf{K}^{-1}\mathbf{f}
$$

$$
\boldsymbol{\Sigma}_{*}=k_{**}-\mathbf{k}_{*}^{\textrm{T}}\mathbf{K}^{-1}\mathbf{K}_{*}
$$

<h4><b>Noisy Case</b></h4>

If we instead observe a noisy function, $y=f\left(x\right)+\epsilon$ where $\epsilon\sim\mathcal{N}\left(0,\,\sigma_n^2\right)$, the matrix $\mathbf{K}$ becomes

$$
\mathbf{K}_n=\mathbf{K}+\sigma_n^2\mathbf{I}
$$

assuming that each observation is corrupted by independent noise. The prediction for the new function value and its uncertainty are then given by

$$
\boldsymbol{\mu}_{*}=\mathbf{k}_{*}^{\textrm{T}}\mathbf{K}_{n}^{-1}\mathbf{f}
$$

$$
\boldsymbol{\Sigma}_{*}=k_{**}-\mathbf{k}_{*}^{\textrm{T}}\mathbf{K}_{n}^{-1}\mathbf{k}_{*}
$$
</p>

<h2>Learning the Kernel Parameters</h2>

<p align="justify">The kernel parameters can be estimated by maximising the marginal likelihood, $\mathcal{P}\left(\mathbf{y}\left|\mathbf{X}\right.\right)$, which is a multivariate Gaussian distribution, $\mathcal{N}\left(\mathbf{y}\left|0,\,\mathbf{K}_{n}\right.\right)$. Hence,

\begin{align}
\textrm{log }\mathcal{P}\left(\mathbf{y}\left|\mathbf{X}\right.\right)=-\dfrac{1}{2}\left[\mathbf{y}^{\textrm{T}}\mathbf{K}_{n}^{-1}\mathbf{y}+\textrm{log}\left|\mathbf{K}_n \right|+N\textrm{log}\left(2\pi\right)\right]
\end{align}
</p>

<p align="justify">where $N$ is the number of training data points. The third term does not depend on the kernel parameters and is simply an additive constant. The derivative of the log marginal likelihood,

$$
\dfrac{\partial}{\partial\theta_{j}}\textrm{log }\mathcal{P}\left(\mathbf{y}\left|\mathbf{X}\right.\right)=-\dfrac{1}{2}\left[\mathbf{y}^{\textrm{T}}\dfrac{\partial\mathbf{K}_{n}^{-1}}{\partial\theta_{j}}\mathbf{y}+\dfrac{\partial}{\partial\theta_{j}}\textrm{log}\left|\mathbf{K}_{n}\right|\right]
$$
</p>

<p align="justify">can be further simplified using the facts that $\dfrac{\partial\mathbf{K}_{n}^{-1}}{\partial\theta_{j}}=-\mathbf{K}_{n}^{-1}\dfrac{\partial\mathbf{K}_{n}}{\partial\theta_{j}}\mathbf{K}_{n}^{-1}$ and that $ \dfrac{\partial}{\partial\theta_{j}}\textrm{log}\left|\mathbf{K}_{n}\right|=\textrm{tr}\left(\mathbf{K}_{n}^{-1}\dfrac{\partial\mathbf{K}_{n}}{\partial\theta_{j}}\right)$ such that 

$$
\dfrac{\partial}{\partial\theta_{j}}\textrm{log }\mathcal{P}\left(\mathbf{y}\left|\mathbf{X}\right.\right)=\dfrac{1}{2}\left[\mathbf{y}^{\textrm{T}}\mathbf{K}_{n}^{-1}\dfrac{\partial\mathbf{K}_{n}}{\partial\theta_{j}}\mathbf{K}_{n}^{-1}\mathbf{y}-\textrm{tr}\left(\mathbf{K}_{n}^{-1}\dfrac{\partial\mathbf{K}_{n}}{\partial\theta_{j}}\right)\right]
$$
</p>

<p align="justify">With the gradient in hand, an optimisation algorithm can readily be used to estimate the hyper-parameters. Alternatively, a fully Bayesian approach can be used to infer the posterior distributions of the hyper-parameters.</p>

<h2>Examples</h2>
<p align="justify">Below, we consider two examples: one noise-free and one noisy. For illustration, we set both kernel parameters, $\sigma$ and $\ell$, equal to 1. The first example shows that the Gaussian Process performs well on noise-free, equally spaced data. We consider a simple sinusoidal function,

$$
f=\textrm{sin}\left(x\right)\hspace{2cm}\left[0,\,2\pi\right]
$$

</p>

<p align="center"><img src="/images/example_1_uniform.png" alt="uniform_gp" width="60%" height="60%"></p>

<p align="justify">For the second example, we generate noisy data that are not equally spaced. The key point is that the Gaussian Process reflects our level of confidence depending on where data are available: as expected, the predictions are more confident where there are more data, and less confident where there are none.</p>



<p align="center"><img src="/images/example_1_non_uniform.png" alt="non_uniform_gp" width="60%" height="60%"></p>

