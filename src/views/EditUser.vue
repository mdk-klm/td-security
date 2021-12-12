<template>
    <Form :usage="'edit'" :user="user"/>
</template>

<script>
import Form from "@/components/Form";
import axios from "axios";

export default {
    name: "EditUser",
    components: {
        Form
    },
    data() {
        return {
            user: {}
        }
    },
    methods: {
        getUserById() {
            axios
                .get(`http://localhost:6929/users/${this.$route.params.id}`)
                .then(response => this.user = response.data)
        }
    },
    created() {
        this.getUserById();
    }
}
</script>

<style scoped>

</style>
