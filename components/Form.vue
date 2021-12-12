<template>
    <!-- Template pour la création d'un utilisateur -->
    <template v-if="usage === 'create'">
        <div class="container">
            <label for="firstnameC">Prénom</label>
            <input v-model="newUser.firstName" type="text" class="form-control" id="firstnameC"
                   placeholder="Insérez votre prénom">
            <label for="lastnameC">Nom</label>
            <input v-model="newUser.lastName" type="text" class="form-control" id="lastnameC"
                   placeholder="Insérez votre nom">
            <label for="emailC">Email</label>
            <input v-model="newUser.email" type="email" class="form-control" id="emailC"
                   placeholder="Insérez votre email">
            <label for="birthdateC">Date de naissance</label>
            <input v-model="newUser.birthDate" type="date" class="form-control" id="birthdateC">
            <label for="avatarUrlC">Photo</label>
            <input id="avatarUrlC" class="form-control" type="file" @change="onFileChange"/>
            <label for="genderC">Genre</label>
            <select class="form-select" id="genderC" v-model="newUser.gender">
                <option value="male">Homme</option>
                <option value="female">Femmme</option>
            </select>
            <button type="submit" class="btn btn-success" v-on:click="createUser">Créer</button>
        </div>
    </template>

    <!-- Template pour la modification d'un utilisateur -->
    <template v-if="usage === 'edit'">
        <div class="container">
            <div class="img-edit">
                <img :src="`http://localhost:6929${updateUser.avatarUrl}`">
            </div>
            <label for="firstname">Prénom</label>
            <input v-model="updateUser.firstName" type="text" class="form-control" id="firstname"
                   placeholder="Insérez votre prénom">
            <label for="lastname">Nom</label>
            <input v-model="updateUser.lastName" type="text" class="form-control" id="lastname"
                   placeholder="Insérez votre nom">
            <label for="email">Email</label>
            <input v-model="updateUser.email" type="email" class="form-control" id="email"
                   placeholder="Insérez votre email">
            <label for="birthdate">Date de naissance</label>
            <input v-model="updateUser.birthDate" type="date" class="form-control" id="birthdate">
            <label for="avatarUrl">Photo</label>
            <input id="avatarUrl" class="form-control" type="file" @change="onFileChange"/>
            <label for="gender">Genre</label>
            <select class="form-select" id="gender" v-model="updateUser.gender">
                <option value="male">Homme</option>
                <option value="female">Femmme</option>
            </select>
            <button type="submit" class="btn btn-success" v-on:click="editUser">Editer</button>
        </div>
    </template>
</template>

<script>
import axios from "axios";

export default {
    name: "Form",
    props: {
        user: Object,
        usage: String
    },
    data() {
        return {
            newUser: {},
            updateUser: {},
            selectedFile: ''
        }
    },
    methods: {
        onFileChange(e) {
            this.selectedFile = e.target.files[0];
        },
        // Créer un utilisateur
        createUser() {
            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('firstName', this.newUser.firstName);
            formData.append('lastName', this.newUser.lastName);
            formData.append('email', this.newUser.email);
            formData.append('birthDate', this.newUser.birthDate);
            formData.append('gender', this.newUser.gender);

            axios
                .post('http://localhost:6929/users', formData)
                .then((response) => {
                    console.log(response);
                    this.$toast.success("Création de l'utilisateur réussie ! Vous allez être redirigé.", {
                        position: 'bottom'
                    });
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 4000);
                })
                .catch(() => {
                    this.$toast.error("Cet email est déjà utilisé", {position: 'bottom'});
                })
        },
        // Modifier un utilisateur
        editUser() {
            axios
                .put(`http://localhost:6929/users/${this.updateUser.id}`, this.updateUser)
                .then(() => {
                    this.$toast.success("Modification de l'utilisateur réussie ! Vous allez être redirigé.", {
                        position: 'bottom'
                    });
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 4000);
                })
        }
    },
    watch: {
        // Permet d'utiliser le v-model sur le data
        user() {
            this.updateUser = this.user;
        }
    }
}
</script>

<style scoped>
.container {
    text-align: start;
}

input, select {
    margin-bottom: 20px;
}

.img-edit {
    margin: auto;
    width: 400px;
}

img {
    width: 100%;
}
</style>
