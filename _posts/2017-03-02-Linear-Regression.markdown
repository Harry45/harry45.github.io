---
layout: post
mathjax: true
title:  "Linear Regression with Maximum Likelihood"
date:   2017-03-02 06:00:00
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
description: "Maximum likelihood fitting, applied to an A-Level physics experiment."
---

<p align="justify">A common problem in statistics is learning the functional relationship between independent variables and a dependent variable. For example, we may want to know how house prices vary with the area of the land, the total size of the house and other criteria. Here, the house price is the dependent variable, often called the response variable, while the land area and total size of the house are the independent variables, also known as attribute variables.</p>

<p align="justify">We begin with linear modelling: given a set of attributes, we want to infer a linear relationship between the attributes and the response. The function we want to fit is typically governed by a set of parameters, say $\theta_{i}$. Before going further, however, it is worth distinguishing between linear and non-linear models.</p>

<div style="background-color: #FFF8C6; margin-left: 20px; margin-right: 20px; padding-bottom: 8px; padding-left: 8px; padding-right: 8px; padding-top: 8px;">
<b>Linear and Non-Linear Models</b><br/>
The equation

\begin{align}
y=\theta_{0} + \theta_{1}x + \theta_{2}x^2
\end{align}

is a linear model because it is linear in the parameters $\theta_{i}$. In contrast, the model 

\begin{align}
y=\textrm{sin}\left(\omega x + \phi\right)
\end{align}

is a non-linear model, since it is non-linear in the parameters $\left(\omega,\,\phi\right)$.
 
</div>

<h2>Maximum Likelihood Method</h2>
<p align="justify">Suppose we now want to fit a polynomial $f\left(x\right)$ of order $M$ to some observed data $\left(x_{i},\,y_{i}\right)$ where $i=0,\,1,\,2,\ldots N-1$. We further assume that the data are corrupted by Gaussian noise, $\sigma_{i}$, so that each observed datum can be described by a Gaussian:

\begin{align}
\mathcal{P}\left(y_{i}\left|\boldsymbol{\theta}\right.\right)=\dfrac{1}{\sqrt{2\pi\sigma_{i}^{2}}}\,\textrm{exp}\left[-\dfrac{1}{2}\left(\dfrac{y_{i}-f\left(x_{i}\left|\boldsymbol{\theta}\right.\right)}{\sigma_{i}}\right)^{2}\right]
\end{align}

where $\boldsymbol{\theta}$ is the set of parameters $\left(\theta_{0},\,\theta_{1},\ldots \theta_{M}\right)$. For simplicity, we illustrate the method with a linear fit to the data, $f\left(x\left|\theta_{0},\,\theta_{1}\right.\right)=\theta_{0}+\theta_{1}x$. Assuming the data points are independent, the likelihood is simply the product of these individual probability distributions.

</p>


<div style="background-color: #FFF8C6; margin-left: 20px; margin-right: 20px; padding-bottom: 8px; padding-left: 8px; padding-right: 8px; padding-top: 8px;">
<b>Matrix and Vector Notations</b><br/>
We define the vector $\mathbf{b}$ as

$$
\mathbf{b=\left(\begin{array}{c}
\frac{y_{0}}{\sigma_{0}}\\
\\
\vdots\\
\\
\frac{y_{N-1}}{\sigma_{N-1}}
\end{array}\right)}
$$

and the design matrix $\mathbf{D}$ as

$$
\mathbf{D}=\left(\begin{array}{cc}
\frac{1}{\sigma_{0}} & \frac{x_{0}}{\sigma_{0}}\\
\\
\\
\\
\frac{1}{\sigma_{N-1}} & \frac{x_{N-1}}{\sigma_{N-1}}
\end{array}\right)
 
$$
</div>

<p align="justify">The likelihood (ignoring the pre-factor) can therefore be written as

\begin{align}
\mathcal{P}\left(\mathbf{y}\left|\boldsymbol{\theta}\right.\right)\propto\textrm{exp}\left[-\dfrac{1}{2}\left(\mathbf{b-\mathbf{D}\boldsymbol{\theta}}\right)^{\textrm{T}}\left(\mathbf{b-\mathbf{D}\boldsymbol{\theta}}\right)\right]
\label{eq:likelihood}
\end{align}

Our aim is to maximise the likelihood, so its derivative with respect to the parameters should be zero. Maximising the likelihood is equivalent to maximising the log-likelihood, since the logarithm is a monotonic transformation. Some useful identities for differentiating with respect to a vector are given below.</p>

<div style="background-color: #FFF8C6; margin-left: 20px; margin-right: 20px; padding-bottom: 8px; padding-left: 8px; padding-right: 8px; padding-top: 8px;">
<b>Differentiating with respect to a vector</b><br/>

$$
\dfrac{\partial\mathbf{A}\mathbf{x}}{\partial\mathbf{x}}=\mathbf{A}
$$

$$
\dfrac{\partial\mathbf{x}^{\textrm{T}}\mathbf{A}}{\partial\mathbf{x}}=\mathbf{A}^{\textrm{T}}
$$

If $\mathbf{A}$ is a symmetric matrix, 
$$
\dfrac{\partial\mathbf{x}^{\textrm{T}}\mathbf{A}\mathbf{x}}{\partial\mathbf{x}}=2\mathbf{x}^{\textrm{T}}\mathbf{A}
$$

For further details, see <a href="https://en.wikipedia.org/wiki/Matrix_calculus">Wikipedia</a> or the <a href="http://www2.imm.dtu.dk/pubdb/views/edoc_download.php/3274/pdf/imm3274.pdf">Matrix Cookbook.</a>
</div>


<p align="justify">Using Equation \eqref{eq:likelihood} and these identities, we obtain</p>

\begin{align}
\boldsymbol{\theta}_{\textrm{MLE}}=\left(\mathbf{D}^{\textrm{T}}\mathbf{D}\right)^{-1}\mathbf{D}^{\textrm{T}}\mathbf{b}
\end{align}


<p align="justify">The matrix $\mathbf{C}=\left(\mathbf{D}^{\textrm{T}}\mathbf{D}\right)^{-1}$ is the covariance matrix, which gives the uncertainties on the fitted parameters. Its diagonal elements are the variances of the parameters, and its off-diagonal elements are the covariances between parameters $\theta_{j}$ and $\theta_{k}$. The errors on the parameters are therefore the square roots of the diagonal elements of $\mathbf{C}$.</p>

<h2>Example - A Physics Problem</h2>

<img src="/images/Linear_Regression_Circuit.png" align="left" width = "420"/>

<p align="justify">We now apply this method to a physics problem (Physics 9702, November 2016, Paper 52). A student is investigating the characteristics of different light-emitting diodes (LEDs). Each LED
needs a minimum potential difference across it to emit light. The circuit is set up as shown on the left. </p>


<p align="justify">The potentiometer is adjusted until the LED just emits light. The potential difference $V$ across the LED is measured. The experiment is repeated for LEDs that emit light of different wavelength $\lambda$. It is suggested that $V$ and $\lambda$ are related by the equation

\begin{align}
V=p\lambda^{q}
\end{align}

where $p$ and $q$ are constants. If we plot $\textrm{lg }V$ on the $y$-axis against $\textrm{lg }\lambda$ on the $x$-axis, the gradient of the straight line corresponds to $q$ and the $y$-intercept to $\textrm{lg }p$. Explicitly,

$$
\textrm{lg }V = q\,\textrm{lg }\lambda + \textrm{lg }p
$$
</p>

<img src="/images/Linear_Regression_Data.png" align="right" width = "420"/>

<p align="justify">The values of $V$ and $\lambda$ are given in the table below, together with $\textrm{lg }\lambda$ and $\textrm{lg }V$ and its associated error. The error in $\textrm{lg }V$ is

$$
\sigma_{\textrm{lg }V} = \dfrac{\Delta V}{V}
$$

See this <a href="http://phys114115lab.capuphysics.ca/App%20A%20-%20uncertainties/appA%20propLogs.htm">link</a> for further details. We calculate $\textrm{lg }\lambda$ and $\textrm{lg }V$ to two decimal places, and assume that each data point is Gaussian distributed with mean $\mu=\textrm{lg }V$ and standard deviation $\sigma = \sigma_{\textrm{lg }V}$, as illustrated on the right. Plotting $\textrm{lg }V$ against $\textrm{lg }\lambda$, we find a gradient of $-2.60$ and a $y$-intercept of $7.56$.</p>





<table class="tableizer-table" align = "left">
<thead><tr class="tableizer-firstrow"><th>$\lambda/10^{-9}$ m </th><th>$V/\,\textrm{V}$</th><th>$\textrm{lg}\left(\lambda/10^{-9}\,\textrm{m}\right)$</th><th>$\textrm{lg}\left(V/\,\textrm{V}\right)$</th></tr></thead><tbody>
 <tr><td align="center">630</td><td align="center">$1.9\pm0.1$</td><td align="center">2.80</td><td align="center">$ 0.28\pm0.05$ </td></tr>
 <tr><td align="center">620</td><td align="center">$2.0\pm0.1$</td><td align="center">2.79</td><td align="center">$0.30\pm0.05$ </td></tr>
 <tr><td align="center">590</td><td align="center">$2.3\pm0.1$</td><td align="center">2.77</td><td align="center">$0.36\pm0.04$</td></tr>
 <tr><td align="center">520</td><td align="center">$3.1\pm0.1$</td><td align="center">2.72</td><td align="center">$0.49\pm0.03$</td></tr>
 <tr><td align="center">490</td><td align="center">$3.7\pm0.1$</td><td align="center">2.69</td><td align="center">$0.57\pm0.03$</td></tr>
 <tr><td align="center">470</td><td align="center">$4.1\pm0.1$</td><td align="center">2.67</td><td align="center">$0.61\pm0.02$</td></tr>
</tbody></table>

<p align="justify" style="margin-left:32em">The covariance matrix is

$$
\mathbf{C}=\left(\begin{array}{cc}
0.670 & -0.258\\
-0.258 & 0.095
\end{array}\right)
 
$$

Hence, 

$$
q=-2.60\pm0.31
$$

$$
\textrm{lg }p = 7.56\pm0.82
$$
</p>
<img src="/images/Linear_Regression_Fit.png" align="right" width = "420"/>


<p align="justify" style="margin-top:3em">In summary, the estimates of $p$ and $q$ are $3.61\times10^{7}$ and $-2.60$, respectively. The covariance matrix also tells us about the correlation between the two parameters: since the off-diagonal elements are negative, the parameters are negatively correlated, meaning that an increase in one corresponds to a decrease in the other. This is illustrated in the figure below, which also shows the $1\sigma$, $2\sigma$ and $3\sigma$ credible intervals. Note also that the joint distribution of the two parameters $\left(\textrm{lg }p,\,q\right)$ is Gaussian, since we are working with a linear model. Finally, the values of $p$ and $q$ can be used to estimate the minimum potential difference required for a different diode, for example, one emitting at a wavelength of $950$ nm.
</p>

<img src="/images/Linear_Regression_Correlation.png" align="left" width = "420"/>

<h2>Summary and Conclusion</h2> 
<p align="justify" style="margin-left:28em">In this post, we have covered one method of inferring parameters, the Maximum Likelihood Estimator, and illustrated it with an example. The method provides good estimates of the parameters and their associated errors, and the covariance matrix also reveals the correlations between the parameters.</p>

<p align="justify" style="margin-left:28em">If we had prior information on the parameters, we would turn to Bayesian statistics. The approach is similar, except that each parameter would have a prior probability distribution, and instead of the MLE we would obtain the MAP, or Maximum a Posteriori, estimates of the parameters. With uniform priors, the MAP and MLE coincide.</p>











