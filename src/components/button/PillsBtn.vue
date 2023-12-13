<template>
    <button class="h-[45px] min-h-max px-7 rounded-full capitalize">{{ label }}</button>
</template>
<script>
export default {
    props: {label: {type: String, required: true}}
}
</script>