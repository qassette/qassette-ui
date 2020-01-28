<script>
  import './style.scss'

  export let logEntries;
</script>

<div class="row justify-content-center mt-5 log">
  <div class="form-group">
    <div class="log__box">
      {#each logEntries as elem}
        <div>{elem}</div>
      {/each}
    </div>
  </div>
</div>
