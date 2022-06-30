<script lang="ts">
  import {date} from '@/stores/date'
</script>

<label for="date">일자 선택</label>
<input type="date" name="date" bind:value={$date} />