---
layout: blog
list_title: "NewZ: Claire's New Zealand Exchange Newspaper"
permalink: /museum/newz/
---
<p> I was incredibly lucky to be able to go on exchange to New Zealand from February to June, 2025. Below are weekly blog posts from my study abroad. </p>
<div class="post-grid">
  {% for post in site.posts reversed %}
    {% assign thumb = post.thumbnail | default: post.image %}
    <a class="post-card" href="{{ post.url | relative_url }}">
      <div
        class="post-thumb"
        style="background-image: url('{{ thumb | relative_url }}')">
        <div class="post-meta">
          <h3>{{ post.title }}</h3>
          <span>{{ post.date | date: "%B %d, %Y" }}</span>
        </div>
      </div>
    </a>
  {% endfor %}
</div>

