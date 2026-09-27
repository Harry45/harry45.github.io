---
layout: post
mathjax: true
title:  "An Introduction to Gibbs Sampling"
date:   2016-10-17 12:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  - 
  -
excerpt:
description: "The Gibbs sampler, with a worked Bayesian regression example in Python."
---

<p align="justify">Gibbs sampling is a variant of the Markov Chain Monte Carlo (MCMC) method (<a href="https://en.wikipedia.org/wiki/Gibbs_sampling">Wikipedia</a>). The idea is to update one parameter at a time, which requires the conditional distributions. As with the standard Metropolis-Hastings algorithm, samples in a Gibbs chain are correlated with nearby samples, so if independent samples are required, the chain should be thinned by keeping only every n<sup>th</sup> value. In addition, the initial samples (the burn-in) are discarded, as they may not represent the underlying "true" distribution. The Gibbs sampling algorithm is as follows:
<ol type="1">
<li>Initialise $\boldsymbol{\theta}=\left(\theta_{0},\,\theta_{1},\,\ldots\theta_{n}\right)$.</li> 
<li>Sample the parameters as follows:</li>
<ul>
<li>Sample $\theta_{0}'$ from $\theta_{0}\left|\theta_{1},\,\theta_{2},\,\ldots\theta_{n}\right.$.</li>
<li>Sample $\theta_{1}'$ from $\theta_{1}\left|\theta_{0}',\,\theta_{2},\ldots\theta_{n}\right.$.</li>
<li>$\vdots$</li>
<li>Sample $\theta_{k}'$ from $\theta_{k}\left|\theta_{0}',\,\theta_{1}',\ldots,\,\theta_{k-1}',\,\theta_{k+1},\,\ldots\theta_{n}\right.$</li>
</ul></ol>


<p align="justify">Note that this requires the conditional distributions. The advantage of Gibbs sampling is that it reduces the need for the "tuning" required by the Metropolis-Hastings algorithm. The starting point can simply be guessed or found using an optimisation algorithm.</p>

<h2>Example - Bayesian Linear Regression</h2>

<p align="justify">We use a simple Bayesian linear regression to illustrate Gibbs sampling in practice. Suppose we have the data points $\mathcal{D}=\left\{ x_{i},\,y_{i}\right\} $ for $i=1,\,2,\ldots N$ generated from the model $y=\theta_{0}+\theta_{1}x$.
In other words,</p> 

\begin{align}
y=\theta_{0}+\theta_{1}x+\epsilon
\end{align}


<p align="justify">where $\epsilon\sim\mathcal{N}\left(0.0,\,\sigma_{n}^{2}\right)$. Our aim is to find the full posterior distributions of the parameters $\theta_{0}$ and $\theta_{1}$. The joint posterior distribution is simply</p>

\begin{align}
\mathcal{P}\left(\theta_{0},\,\theta_{1}\left|\mathcal{D}\right.\right)\propto\mathcal{P}\left(\mathcal{D}\left|\theta_{0},\,\theta_{1}\right.\right)\mathcal{P}\left(\theta_{0},\,\theta_{1}\right)
\end{align}


<p align="justify">where we assume factorisable priors, that is, $\mathcal{P}\left(\theta_{0},\,\theta_{1}\right)=\mathcal{P}\left(\theta_{0}\right)\,\mathcal{P}\left(\theta_{1}\right)$ and choose Gaussian priors such that</p>

\begin{align}
\mathcal{P}\left(\theta_{0}\right)\sim\mathcal{N}\left(\mu_{0},\,\Sigma_{0}^{2}\right)\hspace{2cm}\mathcal{P}\left(\theta_{1}\right)\sim\mathcal{N}\left(\mu_{1},\,\Sigma_{1}^{2}\right)
\end{align}

<h2>Procedures</h2>

<p align="justify">We first define the design matrices $\mathbf{D}_{0}$, $\mathbf{D}_{1}$ and the vector $\mathbf{b}$ as follows:</p>

$$
\mathbf{D}_{0}=\left[\begin{matrix}
\frac{1}{\sigma_{1}}\cr
\frac{1}{\sigma_{2}}\cr
\vdots\cr
\vdots\cr
\frac{1}{\sigma_{N}}
\end{matrix}\right]\hspace{2cm}\mathbf{D}_{1}=\left[\begin{matrix}
\frac{x_{1}}{\sigma_{1}}\cr
\frac{x_{2}}{\sigma_{2}}\cr
\vdots\cr
\vdots\cr
\frac{x_{N}}{\sigma_{N}}
\end{matrix}\right]\hspace{2cm}\mathbf{b}=\left[\begin{matrix}
\frac{y_{1}}{\sigma_{1}}\cr
\frac{y_{2}}{\sigma_{2}}\cr
\vdots\cr
\vdots\cr
\frac{y_{N}}{\sigma_{N}}
\end{matrix}\right]
$$


<p align="justify">Since $\sigma_{n}$ is assumed to be known, the likelihood can be written as</p>


\begin{align}
\mathcal{P}\left(\mathcal{D}\left|\theta_{0},\,\theta_{1}\right.\right)\propto\textrm{exp}\left[-\dfrac{1}{2}\left(\mathbf{b}-\theta_{0}\mathbf{D}_{0}-\theta_{1}\mathbf{D}_{1}\right)^{\textrm{T}}\left(\mathbf{b}-\theta_{0}\mathbf{D}_{0}-\theta_{1}\mathbf{D}_{1}\right)\right]
\end{align}


<p align="justify"> and the prior as</p>

\begin{align}
\mathcal{P}\left(\theta_{0}\right)\propto\textrm{exp}\left[-\dfrac{1}{2}\left(\dfrac{\theta_{0}^{2}-2\mu_{0}\theta_{0}}{\Sigma_{0}^{2}}\right)\right]\textrm{exp}\left[-\dfrac{1}{2}\left(\dfrac{\theta_{1}^{2}-2\mu_{1}\theta_{1}}{\Sigma_{1}^{2}}\right)\right]
\end{align}


<p align="justify">The dependence of the log-joint posterior on $\theta_{0}$, that is, $\theta_{0}\left|\theta_{1},\,\mathcal{D}\right.$, is simply</p>

$$
-\dfrac{1}{2}\left[\theta_{0}^{2}\left(\mathbf{D}_{0}^{\textrm{T}}\mathbf{D}_{0}+\dfrac{1}{\Sigma_{0}^{2}}\right)+\theta_{0}\left(2\theta_{1}\mathbf{D}_{0}^{\textrm{T}}\mathbf{D}_{1}-2\mathbf{b}^{\textrm{T}}\mathbf{D}_{0}-\dfrac{2\mu_{0}}{\Sigma_{0}^{2}}\right)\right]
$$


<p align="justify">This is a quadratic function of $\theta_{0}$. If $a=\mathbf{D}_{0}^{\textrm{T}}\mathbf{D}_{0}+\dfrac{1}{\Sigma_{0}^{2}}$
and $b=2\theta_{1}\mathbf{D}_{0}^{\textrm{T}}\mathbf{D}_{1}-2\mathbf{b}^{\textrm{T}}\mathbf{D}_{0}-\dfrac{2\mu_{0}}{\Sigma_{0}^{2}}$,
then </p>

$$
\mathcal{P}\left(\theta_{0}\left|\theta_{1},\,\mathcal{D}\right.\right)\propto\textrm{exp}\left[-\dfrac{1}{2}\left(a\theta_{0}^{2}+b\theta_{0}\right)\right]
$$


<p align="justify">Completing the square gives</p>

$$
\mathcal{P}\left(\theta_{0}\left|\theta_{1},\,\mathcal{D}\right.\right)\propto\textrm{exp}\left[-\dfrac{a}{2}\left(\theta_{0}+\dfrac{b}{2a}\right)^{2}\right]
$$


<p align="justify">This is a Gaussian distribution with mean $\mu$ and standard deviation $\sigma$ given by</p>

$$
\mu=-\dfrac{b}{2a}=\dfrac{-\theta_{1}\Sigma_{0}^{2}\mathbf{D}_{0}^{\textrm{T}}\mathbf{D}_{1}+\Sigma_{0}^{2}\mathbf{b}^{\textrm{T}}\mathbf{D}_{0}+\mu_{0}}{\Sigma_{0}^{2}\mathbf{D}_{0}^{\textrm{T}}\mathbf{D}_{0}+1}
$$


$$
\sigma^{2}=\dfrac{1}{a}=\dfrac{\Sigma_{0}^{2}}{\Sigma_{0}^{2}\mathbf{D}_{0}^{\textrm{T}}\mathbf{D}_{0}+1}
$$


<p align="justify">Similarly, it can be shown that the conditional distribution of $\theta_{1}$, that is, $\mathcal{P}\left(\theta_{1}\left|\theta_{0},\,\mathcal{D}\right.\right)$ is Gaussian with </p>

$$
\mu=\dfrac{-\theta_{0}\Sigma_{1}^{2}\mathbf{D}_{1}^{\textrm{T}}\mathbf{D}_{0}+\Sigma_{1}^{2}\mathbf{b}^{\textrm{T}}\mathbf{D}_{1}+\mu_{1}}{\Sigma_{1}^{2}\mathbf{D}_{1}^{\textrm{T}}\mathbf{D}_{1}+1}
$$


$$
\sigma^{2}=\dfrac{\Sigma_{1}^{2}}{\Sigma_{1}^{2}\mathbf{D}_{1}^{\textrm{T}}\mathbf{D}_{1}+1}
$$


<h2>Python Code</h2>

<p align="justify">We now have all the mathematical tools needed to write the Python code. The simulated data are available on <a href="https://github.com/Harry45/Self-Taught/tree/master/Gibbs_Sampling">GitHub</a>. We first define the linear function and the true parameters: 2.0 for the gradient, $\theta_{1}$, and 0.5 for the y-intercept, $\theta_{0}$. In the code below, m and c denote the gradient and the y-intercept. We also specify the fraction of the chain to be treated as burn-in.</p>


{% highlight python %}
def linear(params):
	return params[0]*x + params[1]

# True Parameters
grad  = 2.0
yint  = 0.5

# Fraction considered as burn-in
frac  = 0.2

# Load the data 
data  = np.loadtxt('data_gibbs.txt')
x     = data[:,0]; xmin = min(x); xmax = max(x)
y     = data[:,1]
sigma = data[:,2]
{% endhighlight %}

<p align="justify">The next step is to create the design matrices $\mathbf{D}_{0}$, $\mathbf{D}_{1}$ and the vector $\mathbf{b}$. We also define the hyper-parameters of the Gaussian priors and the functions used to sample $m$ and $c$, respectively. A further function is used to find the best-fit parameters by optimisation, which then serve as the starting point for the Gibbs sampler.</p>

{% highlight python %}
# Create Design Matrices
Dm = x/sigma
Dc = 1.0/sigma
b  = y/sigma

# Define Priors (Gaussian Priors)
mu_m = 2.0; mu_c = 1.0
si_m = 2.0; si_c = 2.0

# Define Functions for Sampling
def sample_grad(m, c):
	var  = 1.0/(np.dot(Dm.T, Dm) + 1.0/si_m**2)
	mean = var*(np.dot(b.T, Dm) + (mu_m/si_m**2) - c * np.dot(Dc.T, Dm))
	return np.random.normal(mean, np.sqrt(var))

def sample_yint(m, c):
	var  = 1.0/(np.dot(Dc.T, Dc) + 1.0/si_c**2)
	mean = var*(np.dot(b.T, Dc) + (mu_c/si_c**2) - m * np.dot(Dc.T, Dm))	
	return np.random.normal(mean, np.sqrt(var))

# Define the log-likelihood for optimisation
def loglikelihood(theta, data, Sigma):
  theta0, theta1 = theta 
  model     = linear(theta)
  chiSquare = LA.norm((model - data)/Sigma)**2
  loglike   = -0.5 * (chiSquare) 
  return loglike

# Use, for example, Powell method for optimisation
chi_square = lambda *args: -2*loglikelihood(*args)
result     = op.minimize(chi_square, [1.0, 1.0], args=(y, sigma), method = 'Powell', tol = 1E-5)
theta_op   = np.array(result["x"])

m = theta_op[0]
c = theta_op[1]

{% endhighlight %}
<p align="justify">We are now ready to run the sampler. We fix the number of iterations at 200 000 and discard the first 20% of the chain.</p>

{% highlight python %}
iters = 2E5
trace = np.zeros(shape = (int(iters), 2))

def gibbs(m, c):

	for i in range(int(iters)):
		m = sample_grad(m, c)
		c = sample_yint(m, c)
		trace[i,:] = np.array([m, c])

	return trace

samples = gibbs(m,c)
samples = samples[int(frac*iters):] # Reject first 20 % of the chains
{% endhighlight %}

<p align="justify">Finally, we obtain the 2D posterior distribution of the parameters.</p>

{% include image.html url="/images/triangle_plot_gibbs.png" caption="2D posterior plot of the two parameters" width=500 align="center" %}
