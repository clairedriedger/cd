---
layout: page
title: Museum
permalink: /museum/
---
<p style="text-align: center;">
  A display of previous, fun, or random endeavors.
</p>


<div class="museum-grid">

  <figure class="museum-item">
    <a href="/cd/museum/newz" class="museum-link">
      <img src="/cd/images/newz.png"
           alt="NewZ newspaper cover">
      <figcaption>My New Zealand Exchange Newspaper</figcaption>
    </a>
  </figure>

  <figure class="museum-item">
    <a href="/cd/museum/gallery" class="museum-link">
      <img src="/cd/images/gallery.jpg"
           alt="Gallery Cover">
      <figcaption>Art Gallery</figcaption>
    </a>
  </figure>

</div>

<style>
  .museum-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 300px)) !important;
    justify-content: center !important;
    align-items: end;
    gap: 2rem;
    width: 75%;
    margin: 2rem auto;
  }

  .museum-grid .museum-item {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: none !important;
    transform: none !important;
    text-align: center;
    min-width: 0;
  }

  .museum-grid .museum-link {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .museum-grid img {
    display: block;
    width: 100%;
    height: auto;
    min-width: 0;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .museum-grid .museum-item:nth-child(2) img {
    width: 80%;
    margin: 0 auto;
  }


  .museum-grid figcaption {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: black;
    font-style: italic;
  }

  .museum-grid .museum-link:hover img {
    transform: scale(1.02);
  }

  @media (max-width: 600px) {
    .museum-grid {
      grid-template-columns: minmax(0, 1fr) !important;
      max-width: 350px;
    }
  }
</style>

