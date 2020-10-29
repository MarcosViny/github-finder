const userName = document.querySelector('.user')
const searchBtn = document.querySelector('.searchBtn')
const repositories = document.querySelector('.repositories')
const loading = document.querySelector('.hidden')
const withoutRepos = document.querySelector('.without-repos')

function hiddenElement(element, targetClass) {
    element.classList.add(targetClass)
}
function showElement(element, targetClass) {
    element.classList.remove(targetClass)
}

searchBtn.onclick = ev => {
    ev.preventDefault()
    
    useApi(user.value)

    repositories.innerText = ""
    withoutRepos.removeAttribute('id', 'with-repos')
    showElement(loading, 'hidden')
}

function getName(response) {
   /*  for(let repo of response.data) {
        const { name } = repo
        console.log(name)
    } */

    for (let repo of response.data) {
        const repository = document.createElement('li')
        const a = document.createElement('a')

        a.setAttribute('href', `${repo.html_url}`)
        a.setAttribute('target', "_blank")
        a.innerText = `${repo.name}`

        repository.appendChild(a)

        repositories.appendChild(repository)
    }
}

async function useApi(user) {
    try {
        let response = await axios.get(`https://api.github.com/users/${user}/repos`)

        getName(response)

        response.data.length ? 
            withoutRepos.setAttribute('id', 'with-repos') 
            : alert('No momento este usuário não possui repositórios públicos!')
    }
    
    catch (error) {
        if (error.response.status === 404) {
            alert('Usuario Não Encontrado!')
        }
    }

    hiddenElement(loading, 'hidden')
}