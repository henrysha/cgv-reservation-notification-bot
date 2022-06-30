import Airtable from 'airtable'
import { parse } from 'node-html-parser'
import dotenv from 'dotenv'
import { MOVIE_LIST_ENDPOINT } from '@/constants/airtable'
import type { MovieField } from '@/types/movie'

dotenv.config()

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.TABLE_BASE_KEY)

export const getMovieListFromAirtable = async () => {
  return (
    await base('Movies')
      .select({
        view: 'Grid view',
      })
      .all()
  ).map((record) => ({ fields: record.fields, id: record.getId() }))
}

export const getMovieListFromCGV = async () => {
  const html = await (await fetch(MOVIE_LIST_ENDPOINT)).text()
  const root = parse(html)
  const movieChart = root.querySelector('div.sect-movie-chart')
  const movieElements = movieChart.querySelectorAll('li')
  return movieElements.map((element): MovieField => {
    const rank = element.querySelector('.rank').innerText.replace('No.', '')
    const img = element.querySelector('.thumb-image img').getAttribute('src')
    const contentEl = element.querySelector('.box-contents')
    const id = new URL(
      contentEl.querySelector('a').getAttribute('href'),
      'http://www.cgv.co.kr'
    ).searchParams.get('midx')
    const title = contentEl.querySelector('.title').innerText
    const openDate = contentEl
      .querySelector('.txt-info')
      .innerText.replaceAll(/\r?\n|\r|\s+|재?개봉|(D-[0-9]*)/g, '')
    return {
      fields: {
        id,
        rank,
        title,
        openDate,
        img,
      },
    }
  })
}

export const updateMovieListToAirtable = async (movies: MovieField[]) => {
  if (movies.length === 0) return

  while (movies.length > 0) {
    const tenMovies = movies.splice(0, 10)
    base('Movies').create(tenMovies, (err, records) => {
      if (err) {
        console.error(err)
        return
      }

      records.forEach((record) => {
        console.info(`successfully created record: ${record.getId()}`)
      })
    })
  }
}

export const deleteMoviesFromAirtable = async (movies: string[]) => {
  if (movies.length === 0) return

  while (movies.length > 0) {
    const tenMovies = movies.splice(0, 10)
    base('Movies').destroy(tenMovies, (err, deletedRecords) => {
      if (err) {
        console.error(err)
        return
      }

      console.info(
        `successfully deleted records: ${deletedRecords.map((record) =>
          record.getId()
        )}`
      )
    })
  }
}
