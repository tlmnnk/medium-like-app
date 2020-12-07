<template>
<div>
  <div>Error: {{error.message}}</div>
  <div>Please try again later</div>
</div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    error: {
      type: Object,
      requied: false,
      default: () => ({ message: 'Something went wrong...' })
    }
  }
}
</script>

<style>

</style>