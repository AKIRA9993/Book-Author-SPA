
//components handle all the events in the app
//they call store actions as well


<template>
  <footer class="hero-gradient-footer border-top mt-auto py-4">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start">
          <p class="mb-0">
            <i class="fa-solid fa-book me-2"></i>
            <strong>Books & Authors</strong> — Built with Vue 3, Pinia, Router, Bootstrap, Axios, and Font Awesome 
            <br />
            <strong>App Vue Creator : Nourhan Mohamed Fathallah</strong>
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
          <a href="https://fontawesome.com" target="_blank" rel="noopener" class="text-muted text-decoration-none me-3">
            <i class="fa-brands fa-font-awesome"></i>
          </a>
          <a href="https://getbootstrap.com" target="_blank" rel="noopener" class="text-muted text-decoration-none me-3">
            <i class="fa-brands fa-bootstrap"></i>
          </a>
          <a href="https://vuejs.org" target="_blank" rel="noopener" class="text-muted text-decoration-none me-3">
            <i class="fa-brands fa-vuejs"></i>
          </a>
          <a href="www.linkedin.com/in/nourhan-mohamed-fathallah-b677372ba" target="_blank" rel="noopener" class="text-muted text-decoration-none">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>


<style scoped>
.hero-gradient-footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>