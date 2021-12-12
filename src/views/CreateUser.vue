<template>
    <h1>Créer un utilisateur</h1>
    <Form :usage="'create'"/>
</template>

<script>
import Form from "@/components/Form.vue";

export default {
    name: "CreateUser",
    components: {Form}
}
</script>

<style scoped>

</style>
