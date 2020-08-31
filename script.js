const userName = document.querySelector('input[name="user"]')
const searchBtn = document.querySelector('.searchBtn')
const ulElement = document.querySelector('.ulElement')
const feedback = document.querySelector('.hidden')

searchBtn.onclick = ev => {
    ev.preventDefault()
    feedback.classList.remove('hidden')
    useApi(userName.value)
    ulElement.innerText = ""
}

function getName(response) {
    for(let prop of response.data) {
        const liElement = document.createElement('li')
        const a = document.createElement('a')

        a.setAttribute('href', `https://github.com/${userName.value}/${prop.name}`)
        a.setAttribute('target', "_blank")
        a.innerText = `${prop.name}`

        liElement.appendChild(a)
        
        ulElement.appendChild(liElement)
    }
}

function useApi(user) {
    axios.get(`https://api.github.com/users/${user}/repos`)
        .then((response) => {
            getName(response)
            if(!response.data.length) {
                alert('No momento este usuário não possui repositórios públicos!')
            }
        })
        .catch((error) => {
            console.log(error)
            if(error.response.status === 404) {
                alert('Usuario Não Encontrado!')
            } 
        })
        .then(() => {
            feedback.classList.add('hidden')
        })
}