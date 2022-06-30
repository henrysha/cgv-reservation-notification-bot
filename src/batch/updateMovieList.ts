import {
  getMovieListFromAirtable,
  deleteMoviesFromAirtable,
  getMovieListFromCGV,
  updateMovieListToAirtable,
} from '@/services/airtable'
;(async () => {
  const moviesFromAirtable = await getMovieListFromAirtable()
  await deleteMoviesFromAirtable(moviesFromAirtable.map(({ id }) => id))
  const moviesFromCGV = await getMovieListFromCGV()
  await updateMovieListToAirtable(moviesFromCGV)
})()
