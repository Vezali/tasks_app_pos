import axios from 'axios'


const basePath = 'http://18.188.122.22:8001/users'

const registrarService = {
    registrar: (data) => {
        return axios.post(`${basePath}/`, {
            name: data.nome,
            email: data.email,
            password: data.senha
        }).then(response => {
            return 'OK'
        }).catch(err => {
            return 'Erro ao registrar, tente novamente'
        });
    }
}

export default registrarService;