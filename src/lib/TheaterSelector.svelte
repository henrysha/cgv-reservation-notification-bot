<script lang="ts">
  import {theaterJsonData} from '@/constants/theaters'
  import {selectedTheaterCode} from '@/stores/theater'

  let selectedAreaCode = theaterJsonData[0].RegionCode
  $: selectedArea = theaterJsonData.find((area) => area.RegionCode === selectedAreaCode)

  function updateSelectedTheater () {
    selectedTheaterCode.set(theaterJsonData.find((area) => area.RegionCode === selectedAreaCode)?.AreaTheaterDetailList[0].TheaterCode)
  }
  updateSelectedTheater()
</script>

<h3>지역</h3>
<select bind:value={selectedAreaCode} on:change={updateSelectedTheater}>
  {#each theaterJsonData as area}
    <option value={area.RegionCode}>{area.RegionName}</option>
  {/each}
</select>
<h3>극장</h3>
<select bind:value={$selectedTheaterCode}>
  {#each selectedArea.AreaTheaterDetailList as theater}
    <option value={theater.TheaterCode}>{theater.TheaterName}</option>
  {/each}
</select>