var params = new URLSearchParams(window.location.search)
var locationParam = decodeURIComponent(params.get('localidade'))
var typeParam = decodeURIComponent(params.get('tipo'))
var modalityParam = decodeURIComponent(params.get('modalidade'))
var priceParam = decodeURIComponent(params.get('price'))
var pageParam = decodeURIComponent(params.get('pagina'))

var listParam = [locationParam, typeParam, modalityParam]

fetch('https://www.namira.com.br/server/db/all.json').then(response => response.json().then(responseData => {
    var filteredData = responseData.filter(value => {
        var stateData = value.uf.toLowerCase()
        var cityData = value.city.toLowerCase()
        var typeData = value.type.toLowerCase()
        var modalityData = value.modality.toLowerCase()
        var priceData = value.price.split(',')[0].replace(/\./gm, '')

        if (priceParam != '') {
            if (parseInt(priceData) < parseInt(priceParam)) {
                if (listParam[0].length == 2) {
                    var listData = [stateData, typeData, modalityData]
                } else {
                    var listData = [cityData, typeData, modalityData]
                }
                listFinal = []
                for (var i in listParam) {
                    if (listParam[i] != '') {
                        listFinal.push(listData[i])
                    }
                }
                var filteredParam = listParam.filter(value => value !== '')

                return JSON.stringify(listFinal) === JSON.stringify(filteredParam)
            }
        } else {
            if (listParam[0].length == 2) {
                var listData = [stateData, typeData, modalityData]
            } else {
                var listData = [cityData, typeData, modalityData]
            }
            listFinal = []
            for (var i in listParam) {
                if (listParam[i] != '') {
                    listFinal.push(listData[i])
                }
            }
            var filteredParam = listParam.filter(value => value !== '')

            return JSON.stringify(listFinal) === JSON.stringify(filteredParam)
        }
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

    var quantityMax = 50

    initLoop = parseInt(pageParam) * quantityMax
    if (pageParam == 1) {
        for (i = 0; i < initLoop; i++) {
            generateSource(filteredData[i])
        }
    } else {
        for (i = initLoop; i < initLoop + 50; i++) {
            generateSource(filteredData[i])
        }
    }

    var quantityNum = filteredData.length
    var pagesNum = quantityNum / quantityMax
    var newPagesNum = pagesNum.toString().split('.')[0]
    if (newPagesNum == 0) {
        newPagesNum = 1
    }
    console.log(newPagesNum)
}))