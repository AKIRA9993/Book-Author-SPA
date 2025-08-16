<!-- About page - tells users what this app is all about -->
<!-- Like the "About Us" section but for our book management system -->
<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h1 class="fw-bold mb-3">About</h1>
        <p class="lead">This SPA showcases a public site and a protected admin dashboard to manage books and authors using Vue 3, Pinia, Vue Router, Bootstrap, and a mock API via json-server.</p>

        <hr class="my-4">

        <h2 class="h4 mb-3">FAQ</h2>
        <div class="accordion" id="faq">
          <div class="accordion-item">
            <h2 class="accordion-header" id="q1">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#c1" aria-expanded="true" aria-controls="c1">
                <i class="fa-solid fa-circle-question me-2"></i>
                What tech is used?
              </button>
            </h2>
            <div id="c1" class="accordion-collapse collapse show" aria-labelledby="q1" data-bs-parent="#faq">
              <div class="accordion-body">
                Vue 3, Pinia, Router, Bootstrap 5, Axios, and json-server.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="q2">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c2" aria-expanded="false" aria-controls="c2">
                <i class="fa-solid fa-shield-halved me-2"></i>
                Is the admin protected?
              </button>
            </h2>
            <div id="c2" class="accordion-collapse collapse" aria-labelledby="q2" data-bs-parent="#faq">
              <div class="accordion-body">
                Demo guard toggles auth in store for simplicity. You can replace with real auth.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>

