<!-- <script lang="ts">
  import { getMovieListFromAirtable } from "@/services/airtable.browser";

  const getMovies = async () => {
    const movieList = await getMovieListFromAirtable()
    return movieList.map((movie) => movie.fields)
  }

  let promise = getMovies()

  $: selectedMovie = promise.then((list) => list[0].id)
</script>

{#await promise}
  <p>...loading</p>
{:then movies}
  <select bind:value={selectedMovie}>
    {#each movies as movie}
      <option value={movie.id}>{movie.title}</option>
    {/each}
  </select>
{:catch}
<p>failed to load movies</p>
{/await} -->
<!-- TODO: need to work on the netlify functions for airtable API first -->