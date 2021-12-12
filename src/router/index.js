import {createRouter, createWebHashHistory} from 'vue-router';
import CreateUser from "@/views/CreateUser";
import ListUsers from "@/views/ListUsers";
import EditUser from "@/views/EditUser";

const routes = [
    {
        path: '/',
        name: 'ListUsers',
        component: ListUsers
    },
    {
        path: '/create',
        name: 'CreateUser',
        component: CreateUser
    },
    {
        path: '/users/:id',
        name: 'EditUser',
        component: EditUser
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
