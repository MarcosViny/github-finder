const userName = document.querySelector('input[name="user"]')
const searchBtn = document.querySelector('.searchBtn')
const ulElement = document.querySelector('.ulElement')
const feedback = document.querySelector('.hidden')

searchBtn.addEventListener('click', () => {
    feedback.classList.remove('hidden')
    useApi(userName.value)
    ulElement.innerHTML = ''
})

function getName(response) {
    for (let prop of response.data) {    
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
        })
        .catch((error) => {
            if(userName.value != ''){
                alert('Usuário não encontrado!')
            } else {
                alert('Digite o nome do Usuário!')
            }
        })
        .then(() => {
            feedback.classList.add('hidden') 
        })
}