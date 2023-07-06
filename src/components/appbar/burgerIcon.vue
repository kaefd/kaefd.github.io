<script>
export default {
    methods: {
        burger() {
            var element = document.getElementById("burg");
            element.classList.add("active");
            var stick1 = document.getElementById("stick1");
            stick1.classList.add("animate_animated", "animate__rotateIn")
        }
    }
}
</script>

<template>
    <v-div class="mt-2" @click="burger()">
        <input type="checkbox" id="menu_checkbox">
        <label for="menu_checkbox">
        <div></div>
        <div></div>
        <div></div>
        </label>
    </v-div>
   
</template>

<style scoped>
#menu_checkbox {
  display: none;
}

label {
  display: block;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

label:before {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: 1.2s cubic-bezier(0, 0.96, 1, 0.02) background-color;
}

label div {
  position: relative;
  top: 0;
  height: 3px;
  background-color: #3B7AA9;
  margin-bottom: 4px;
  transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width,
    0.3s ease right;
  border-radius: 2px;
}

label div:first-child {
  transform-origin: 0;
}

label div:last-child {
  margin-bottom: 0;
  transform-origin: 31.7px;
}

label div:nth-child(2) {
  right: 0;
  width: 25px;
}

#menu_checkbox:checked + label div:first-child {
  left: 9px;
  top: -3px;
  transform: rotateZ(45deg);
  background: #3B7AA9;
}

#menu_checkbox:checked + label div:last-child {
  top: 6px;
  transform: rotateZ(45deg);
}

#menu_checkbox:checked + label div:nth-child(2) {
  width: 26px;
  top: -1px;
  left: 4px;
  transform: rotateZ(-45deg);
  background: #3B7AA9;
}

</style>