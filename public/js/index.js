function autoComplete(listValue, inputValue) {
    return listValue.filter(value => {
        var valueMin = value.toLowerCase()
        var valueMax = inputValue.toLowerCase()
        return valueMin.includes(valueMax)
    })
}

function convertState(value) {
    var state = {
        "AC": "Acre",
        "AL": "Alagoas",
        "AP": "Amapá",
        "AM": "Amazonas",
        "BA": "Bahia",
        "CE": "Ceará",
        "DF": "Distrito Federal",
        "ES": "Espírito Santo",
        "GO": "Goiás",
        "MA": "Maranhão",
        "MT": "Mato Grosso",
        "MS": "Mato Grosso do Sul",
        "MG": "Minas Gerais",
        "PA": "Pará",
        "PB": "Paraíba",
        "PR": "Paraná",
        "PE": "Pernambuco",
        "PI": "Piauí",
        "RJ": "Rio de Janeiro",
        "RN": "Rio Grande do Norte",
        "RS": "Rio Grande do Sul",
        "RO": "Rondônia",
        "RR": "Roraima",
        "SC": "Santa Catarina",
        "SP": "São Paulo",
        "SE": "Sergipe",
        "TO": "Tocantins"
    }
    return state[value].toUpperCase()
}

fetch('https://www.namira.com.br/server/db/all.json').then(response => response.json().then(responseData => {
    function generateArray(indice) {
        var list = Array()
        responseData.map(value => list.push(value[indice]))
        var newList = list.filter((value, i) => list.indexOf(value) === i)
        return newList
    }

    function convertCity(value) {
        for (i = 0; i < responseData.length; i++) {
            if (responseData[i].city == value) {
                return responseData[i].uf
            }
        }
    }

    var listState = generateArray('uf')
    var listCity = generateArray('city')
    var campLocation = document.getElementById('location')

    campLocation.addEventListener('input', ({ target }) => {
        var campValue = target.value
        var locationContainer = document.getElementById('container-location')

        if (campValue.length) {
            var autoCompleteValuesState = autoComplete(listState, campValue)
            var autoCompleteValuesCity = autoComplete(listCity, campValue)

            var sugestionsState = document.getElementById('sugestions-state')
            if (autoCompleteValuesState.length > 0) {
                sugestionsState.innerHTML = `${autoCompleteValuesState.map(value => {
                    return `<li data="${value.toLowerCase()}">${convertState(value)} - ${value}</li>`
                }).join('')}`
                locationContainer.classList.remove('disabled')
            } else {
                sugestionsState.innerHTML = `<li>Nenhum estado</li>`
                locationContainer.classList.remove('disabled')
            }
            var sugestionsCity = document.getElementById('sugestions-city')
            if (autoCompleteValuesCity.length > 0) {
                sugestionsCity.innerHTML = `${autoCompleteValuesCity.map(value => {
                    return `<li data="${value.toLowerCase()}">${value} - ${convertCity(value)}</li>`
                }).join('')}`
                locationContainer.classList.remove('disabled')
            } else {
                sugestionsCity.innerHTML = `<li>Nenhuma cidade</li>`
                locationContainer.classList.remove('disabled')
            }
        } else {
            campLocation.setAttribute('data', '')
            locationContainer.classList.add('disabled')
        }
    })

    var listType = generateArray('type')
    var campType = document.getElementById('type')

    campType.addEventListener('input', ({ target }) => {
        var campValue = target.value
        var typeContainer = document.getElementById('container-type')

        if (campValue.length) {
            var sugestionsType = document.getElementById('sugestions-type')
            sugestionsType.innerHTML = `${listType.map(value => {
                return `<li data="${value.toLowerCase()}">${value.toUpperCase()}</li>`
            }).join('')}`
            typeContainer.classList.remove('disabled')
        } else {
            campType.setAttribute('data', '')
            typeContainer.classList.add('disabled')
        }
    })

    var listModality = generateArray('modality')
    var campModality = document.getElementById('modality')

    campModality.addEventListener('input', ({ target }) => {
        var campValue = target.value
        var modalityContainer = document.getElementById('container-modality')

        if (campValue.length) {
            var sugestionsModality = document.getElementById('sugestions-modality')
            sugestionsModality.innerHTML = `${listModality.map(value => {
                return `<li data="${value.toLowerCase()}">${value.toUpperCase()}</li>`
            }).join('')}`
            modalityContainer.classList.remove('disabled')
        } else {
            campModality.setAttribute('data', '')
            modalityContainer.classList.add('disabled')
        }
    })


    var sugestionsState = document.getElementById('sugestions-state')
    sugestionsState.addEventListener('click', ({ target }) => {
        if (target.textContent != 'Nenhum estado') {
            campLocation.value = target.textContent
            var locationContainer = document.getElementById('container-location')
            campLocation.setAttribute('data', target.getAttribute('data'))
            locationContainer.classList.add('disabled')
        }
    })

    var sugestionsCity = document.getElementById('sugestions-city')
    sugestionsCity.addEventListener('click', ({ target }) => {
        if (target.textContent != 'Nenhuma cidade') {
            campLocation.value = target.textContent
            var locationContainer = document.getElementById('container-location')
            campLocation.setAttribute('data', target.getAttribute('data'))
            locationContainer.classList.add('disabled')
        }
    })

    var sugestionsType = document.getElementById('sugestions-type')
    sugestionsType.addEventListener('click', ({ target }) => {
        campType.value = target.textContent
        var typeContainer = document.getElementById('container-type')
        campType.setAttribute('data', target.getAttribute('data'))
        typeContainer.classList.add('disabled')
    })

    var sugestionsModality = document.getElementById('sugestions-modality')
    sugestionsModality.addEventListener('click', ({ target }) => {
        campModality.value = target.textContent
        var modalityContainer = document.getElementById('container-modality')
        campModality.setAttribute('data', target.getAttribute('data'))
        modalityContainer.classList.add('disabled')
    })

    responseData.sort((a, b) => {
        return (b.discount - a.discount)
    })

    function generateSource(listFiltered) {
        if (listFiltered != undefined) {
            var containerCards = document.getElementById('cards-container')

            var cards = document.createElement('div')
            cards.classList.add('cards')
            containerCards.appendChild(cards)

            var img = document.createElement('img')
            img.classList.add('card-img')
            img.src = listFiltered.image
            img.alt = listFiltered.description
            cards.appendChild(img)

            var containerData = document.createElement('div')
            containerData.classList.add('data-container')

            var title = document.createElement('h1')
            title.classList.add('card-title')
            title.textContent = `${listFiltered.type} em ${listFiltered.city} - ${listFiltered.district} - ${listFiltered.uf}`.toUpperCase()
            containerData.appendChild(title)

            var containerDiscount = document.createElement('div')
            containerDiscount.classList.add('discount-container')

            var containerNumbers = document.createElement('div')
            containerNumbers.classList.add('numbers-container')

            var priceNum = document.createElement('h2')
            priceNum.classList.add('card-price')
            priceNum.textContent = `R$ ${listFiltered.price}`
            containerNumbers.appendChild(priceNum)

            var avaliableNum = document.createElement('h3')
            avaliableNum.classList.add('card-avaliable')
            avaliableNum.textContent = `R$ ${listFiltered.avaliable}`
            containerNumbers.appendChild(avaliableNum)
            containerDiscount.appendChild(containerNumbers)

            var discount = document.createElement('h2')
            discount.classList.add('card-discount')
            discount.textContent = `${listFiltered.discount.split('.')[0]} %`
            containerDiscount.appendChild(discount)
            containerData.appendChild(containerDiscount)

            var containerAddress = document.createElement('div')
            containerAddress.classList.add('info-container')

            var iconAddress = document.createElement('i')
            iconAddress.classList.add('ph', 'ph-navigation-arrow')
            containerAddress.appendChild(iconAddress)

            var address = document.createElement('h4')
            address.classList.add('card-info')
            address.textContent = listFiltered.address.toUpperCase()
            containerAddress.appendChild(address)
            containerData.appendChild(containerAddress)

            var containerModality = document.createElement('div')
            containerModality.classList.add('info-container')

            var iconModality = document.createElement('i')
            iconModality.classList.add('ph', 'ph-currency-circle-dollar')
            containerModality.appendChild(iconModality)

            var modality = document.createElement('h4')
            modality.classList.add('card-info')
            modality.textContent = listFiltered.modality.toUpperCase()
            containerModality.appendChild(modality)
            containerData.appendChild(containerModality)

            cards.appendChild(containerData)
        }

    }

    for (i = 0; i < 50; i++) {
        var loadingContainer = document.getElementById('loading-container')
        loadingContainer.classList.add('disabled')
        generateSource(responseData[i])
    }
}))

var btnRedirect = document.getElementById('btn-search')
btnRedirect.addEventListener('click', () => {
    var dataLocation = document.getElementById('location').getAttribute('data')
    var dataType = document.getElementById('type').getAttribute('data')
    var dataModality = document.getElementById('modality').getAttribute('data')
    var dataPrice = document.getElementById('price').value.split(',')[0].replace(/\./gm, '')
    var url = '/pesquisa?ordenacao=0&localidade=' + encodeURI(encodeURIComponent(dataLocation)) + '&tipo=' + encodeURI(encodeURIComponent(dataType)) + '&modalidade=' + encodeURI(encodeURIComponent(dataModality)) + '&price=' + dataPrice + '&pagina=1'
    window.open(url)
})