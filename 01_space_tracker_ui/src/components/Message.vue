<template>
  <div>Message: {{ message }}</div>
</template>

<script>
  export default {
    name: 'Message',

    props: {
      message: String,
    },
  }
</script>
