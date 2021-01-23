<template>
  <div>
    <menu-admin></menu-admin>
    <segura-component></segura-component>
  </div>
</template>

<script>
import SeguraComponent from "@/components/auth/SeguraComponent";
import MenuAdmin from '@/components/shared/MenuAdmin.vue';
export default {
  components: { SeguraComponent, MenuAdmin },
};
</script>