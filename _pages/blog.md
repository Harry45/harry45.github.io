---
layout: page
title: Blog
lead: Writing on research, mathematics, machine learning and statistics.
permalink: /blog/
---

<ul class="post-list">
{% for post in site.posts %}
  {% capture y %}{{ post.date | date: "%Y" }}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="post-list__year">{{ y }}</li>
  {% endif %}
  {% include post-item.html post=post date_format="%-d %b" %}
{% endfor %}
</ul>

<p><a href="{{ '/categories/' | prepend: site.baseurl }}">Browse by category &rarr;</a> · <a href="{{ '/feed.xml' | prepend: site.baseurl }}">RSS feed</a></p>
