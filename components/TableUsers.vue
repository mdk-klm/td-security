<template>
    <table id="tbl-users" class="table table-hover" v-if="usersFiltered.length">
        <thead>
        <tr>
            <th>Photo</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th @click="changeSort">
                Age
                <i v-if="sortDirection" class="fa"
                   v-bind:class="[ sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down' ]"></i>
            </th>
            <th>Supprimer</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user">
            <td>
                <router-link :to="{name : 'EditUser', params: {id: user.id, user: user} }">
                    <img :src="`http://localhost:6929${user.avatarUrl}`"/>
                </router-link>
            </td>
            <td class="td-text">
                <router-link :to="{name : 'EditUser', params: {id: user.id, user: user} }">
                    {{ user.lastName }}
                </router-link>
            </td>
            <td class="td-text">{{ user.firstName }}</td>
            <td class="td-text">{{ user.email }}</td>
            <td class="td-text">{{ user.age }}</td>
            <td class="td-icon">
                <font-awesome-icon :icon="deleteIcon" size="lg" v-on:click="deleteUser(user.id)" class="icon"/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import axios from "axios";

export default {
    name: "TableUsers",
    props: {
        usersFiltered: Array,
        genderFilter: Array,
        search: String,
        sortDirection: String,
        changeSort: Function
    },
    data() {
        return {
            deleteIcon: faTrash,
            users: []
        }
    },
    components: {
        FontAwesomeIcon,
    },
    watch: {
        changeSort() {
            this.$parent.changeSort()
        },
        usersFiltered() {
            this.users = this.usersFiltered;
        }
    },
    methods: {
        // Supprime un utilisateur du tableau en fonction de son id
        // et recharge la page une fois l'utilisateur supprimé
        deleteUser(userId) {
            console.log(userId);
            axios
                .delete(`http://localhost:6929/users/${userId}`)
                .then(() => {
                    this.$toast.success("Utilisateur supprimé !", {
                        position: 'bottom'
                    });
                    setTimeout(()=>{
                        this.$router.go(0);
                    },2000);
                })
        }
    }
}
</script>

<style scoped>
table {
    width: 80%;
    margin: auto;
}

.td-text {
    padding-top: 75px !important;
}

.td-icon {
    padding-top: 75px !important;
    color: red;
}

img {
    width: 200px;
    padding-top: 0 !important;
}

.icon {
    cursor: pointer;
}
</style>
