<template>
    <div class="headt">
        <button class="btn btn-primary" v-on:click="fetchUsers">Récupérer des utilisateurs</button>
        <label>
            <input v-model="genderFilter" type="checkbox" value="male"
                   :disabled="genderFilter.length<2 && genderFilter.includes('male')"/>
            Hommes
        </label>
        <label>
            <input v-model="genderFilter" type="checkbox" value="female"
                   :disabled="genderFilter.length<2 && genderFilter.includes('female')"/>
            Femmes
        </label>
        <label>
            Rechercher :
            <input type="search" v-model="search" placeholder="Rechercher"/>
        </label>
        <button class="btn btn-primary" @click="resetFilter">Reset</button>
        <label>
            Trier par âge :
            <p v-if="sortDirection === ''">Par défaut</p>
            <p v-if="sortDirection === 'asc'">Croissant</p>
            <p v-if="sortDirection === 'desc'">Décroissant</p>
        </label>
    </div>

    <p v-if="usersFiltered.length">Il y a <strong>{{ usersFiltered.length }}</strong> utilisateurs sur
        {{ users.length }}</p>
    <p v-else>Il y a <strong>0</strong> utilisateur sur {{ users.length }}</p>
    <TableUsers :usersFiltered="usersFiltered" :sortDirection="sortDirection" :changeSort="changeSort"/>
</template>

<script>
import TableUsers from "@/components/TableUsers";
import axios from "axios";

export default {
    name: 'ListUsers',
    components: {
        TableUsers
    },
    data() {
        return {
            users: [],
            genderFilter: (this.$route.query.gender || 'male,female').split(","),
            search: this.$route.query.search || '',
            sortDirection: this.$route.query.sortAge || ''
        }
    },
    computed: {
        usersFiltered() {
            const filter = new RegExp(this.search, "i");
            return this.users
                .filter(user => this.genderFilter.includes(user.gender))
                .filter(user => user.lastName.match(filter) || user.firstName.match(filter))
                .sort((u1, u2) => {
                    if (!this.sortDirection) return 0;
                    const modifier = this.sortDirection === 'desc' ? -1 : 1;
                    return (u1.age - u2.age) * modifier;
                })
        }
    },
    methods: {
        fetchUsers() {
            axios
                .get("http://localhost:6929/users")
                .then(response => this.users = this.users.concat(response.data))
        },
        updateQuery() {
            const query = {}
            if (this.genderFilter.length < 2) {
                query.gender = this.genderFilter.join(',')
            }
            if (this.search) {
                query.search = this.search
            }
            if (this.sortDirection) {
                query.sortAge = this.sortDirection
            }
            this.$router.push({query})
        },
        changeSort() {
            if (this.sortDirection === '') {
                this.sortDirection = 'asc'
            } else if (this.sortDirection === 'asc') {
                this.sortDirection = 'desc'
            } else if (this.sortDirection === 'desc') {
                this.sortDirection = ''
            }
        },
        resetFilter() {
            this.genderFilter = ['male', 'female'];
            this.search = '';
            this.sortDirection = '';
        }
    },
    watch: {
        search() {
            this.updateQuery();
        },
        sortDirection() {
            this.updateQuery();
        },
        genderFilter() {
            this.updateQuery();
        }
    },
    created() {
        this.fetchUsers();
    }
}
</script>

<style scoped>
.headt {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: auto;
    height: 45px;
}
</style>
