---
layout: post
mathjax: true
title:  "An Emulator for the 3D Matter Power Spectrum"
date:   2021-11-16 07:11:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  - 
  -
excerpt:
description: "A Gaussian Process emulator for the power spectrum and its gradients."
---

<p align="justify">The 3D matter power spectrum, $P_{\delta}(k,z)$ is a key quantity that underpins most cosmological data analyses, including galaxy clustering, weak lensing and 21 cm cosmology. Crucially, other (derived) power spectra can be calculated quickly once $P_{\delta}(k,z)$ has been precomputed. In practice, the matter power spectrum is the most expensive component: it is calculated either with Boltzmann solvers such as CLASS or CAMB, or with simulations, which can be computationally expensive depending on the resolution required.</p>

<img src="/images/3D_pk.jpg" align="left" width = "400" style = "margin-right: 10px; margin-bottom: 10px"/>

<p align="justify">This work was published in <a href="https://doi.org/10.1016/j.ascom.2021.100508">Astronomy and Computing</a>. Our contributions are threefold. First, we show that emulation does not always require a zero-mean Gaussian Process; additional basis functions can be included before defining the kernel matrix. This is useful when an approximate model of the function is already available. Moreover, if we know how a particular function behaves, we can adopt a stringent prior on the regression coefficients of the parametric model, encoding our degree of belief in that model. Second, because the Radial Basis Function (RBF) kernel we use is infinitely differentiable, we can estimate the first and second derivatives of the 3D matter power spectrum. The derived expressions for the derivatives involve only element-wise matrix multiplication, with no matrix inverse to compute, making the gradient calculations very fast. Finally, we show that the emulator can output several key power spectra: the linear matter power spectrum at a reference redshift $z_{0}$, and the non-linear 3D matter power spectrum with or without an analytic baryon feedback model. Using the emulated 3D power spectrum together with the tomographic redshift distributions, we also show that the weak lensing and intrinsic alignment (II and GI) power spectra can be generated very quickly using existing numerical techniques. The 3D matter power spectrum can be decomposed as

$$
P_{\delta}(k,z)=D(z)[1+q(k,z)]P_{\textrm{lin}}(k,z_{0})
$$

Each component $D(z)$, $q(k,z)$ and $P_{\textrm{lin}}(k,z_{0})$ is then modelled as a separate semi-parametric Gaussian Process, with a second-order polynomial for the parametric part.</p>

{% include image.html url="/images/all_gradients.jpg" caption="The gradients of the power spectrum with respect to each cosmological parameter at a fixed redshift."  width=800 align="center" %}

<p align="justify">The figure above shows the gradients at a fixed set of cosmological parameters (a test point) and a fixed redshift, $z=0$. The red curves show the gradients calculated by CLASS using the central difference method, and the blue curves show those output by the emulator. This gradient is strictly a 3D quantity, a function of the wavenumber $k$, the redshift $z$ and the cosmological parameters $\boldsymbol{\theta}$. In other words, the emulator's gradient output is a tensor of size $(N_{k},\,N_{z},\,N_{p})$, where $N_{k}$ is the number of wavenumbers for $k\in[5\times 10^{-4},\,50]$, $N_{z}$ is the number of redshifts for $z\in[0.0,\,5]$ and $N_{p}$ is the number of parameters considered. Here, $N_{p}=5$, and the default values for a finer grid in $k$ and $z$ are $N_{k}=1000$ and $N_{z}=100$, respectively.</p>

{% include image.html url="/images/simulator_emulator.jpg" caption="The full posterior distribution of all parameters using the emulator on a toy dataset."  width=600 align="center" %}

<p align="justify">We also tested the emulator on simulated weak-lensing bandpowers. We assume measurements over $10\leq\ell\leq 1500$ and 5 tomographic slices with Gaussian $n(z)$ centred on redshifts [0.5, 1.0, 1.5, 2.0, 2.5] each with a standard deviation of 0.075. Ten bandpowers, equally spaced on a logarithmic scale, are used, giving a set of 150 data points. For simplicity, we simulate, and assume in the likelihood, independent Gaussian errors with $\sigma=0.5\hat{\mathcal{B}}_{\ell}$, where $\hat{\mathcal{B}}_{\ell}$ is the bandpower evaluated at the fiducial set of cosmological parameters. In this case, we set $A_{\textrm{IA}}=0$, although this factor can easily be included and marginalised over during sampling. The fiducial point $\boldsymbol{\theta}_{\textrm{fid}}=[0.12, 0.0225, 3.45, 1.0, 0.72]$ is used to generate the data and is shown by the black dots in the figure above. We use a Gaussian likelihood and uniform priors on all cosmological parameters, matching the input range of the emulator. The figure above shows the results of sampling the cosmological parameters on this toy data set: the red contours correspond to the emulator, and the pale blue contours to the posterior distributions obtained with CLASS. We ran three separate MCMC chains of 150 000 samples each, two with the emulator and one with CLASS, and computed the Gelman-Rubin convergence statistic for each of the three resulting pairs of runs. The worst $\hat{R}$ value is 1.002, consistent with all three chains being drawn from the same distribution and corroborating the agreement shown in the figure. The emulator developed in this work therefore robustly recovers the posterior distributions of all the cosmological parameters, in agreement with the accurate solver, CLASS.</p>


