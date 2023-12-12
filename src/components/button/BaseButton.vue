<template>
    <button class="h-[45px] min-w-[90px] rounded capitalize px-5">{{ label }}</button>
</template>
<script lang="ts">
export default {
    props: {label: {type: String, required: true}}
}
</script>