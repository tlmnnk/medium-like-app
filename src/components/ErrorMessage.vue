<template>
  <div>{{message}}</div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      requied: false,
      default: 'Something went wrong...'
    }
  }
}
</script>

<style>

</style>