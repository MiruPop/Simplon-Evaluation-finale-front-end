//importer les données de la dataBase sous forme de tableau d'Objets
import {
    myArray
} from './db_jeux.js'

//stocker le conteneurs du doc HTML dans des variables
let div = document.getElementById('ctn')
let products = document.querySelector('.products')
let invoice = document.querySelector('.invoice')

//définir une variable "card", qui sera un conteneur pour chaque article
let card = ""
for (let i=0;i<myArray.length;i++) {
    card += `
    <div class="toy">
        <img id="img" src="${myArray[i].url}" alt="toy photo">
        <div>
            <h3 id="brand">${myArray[i].brand}</h3>
            <h3 id="model">${myArray[i].model}</h3>
            <h3 id="price">${myArray[i].price} €</h3>
        </div>
        Quantité : <input min="0" id="qty" type="number" placeholder="0">
        <button class="bouton" href="#">Acheter</button>
    </div>`
}
div.innerHTML = card;

//j'introduis les eventListener pour les click
products.addEventListener('click', sendToCard)
invoice.addEventListener('click', removeFromCard)

//je définis la fonction "addToCart", qui va ajouter les produits séléctionnés dans un tableau récapitulatif
function sendToCard(e) {
    //si l'élément clické est un bouton...
    if(e.target.classList.contains('bouton')) {
        const mycart = e.target.parentElement
        getInfo(mycart)
    }
    //...je crée une variable qui contient les infos de chaque produit (en tant qu'objet)
    function getInfo(mycart) {
        let cartInfo = {
            img: mycart.querySelector('#img').src,
            brand: mycart.querySelector('#brand').textContent,
            model: mycart.querySelector('#model').textContent,
            qty: mycart.querySelector('#qty').value,
            price: mycart.querySelector('#price').textContent
        }
        console.log(cartInfo)

        //interdir au client d'ajouter une valeur égale à zero
        //(il ne peut pas ajouter val. négative ou rien, à cause du "min=0" et du "placeholder=0")
        if (mycart.querySelector('#qty').value == "") {
            alert("Indiquez la quantité souhaitée !")
            return
        }
        else {
            //si différent de 0, j'appelle une fonction "addToCart"...
            addToCart(cartInfo)
        }
    }
    //... qui va insérer les valeurs récupérés dans la var. cartInfo dans un élément nouvellement crée
    function addToCart(cartInfo) {
        //je sélectionne de la chaine "price" uniquement la valeur numérique, sans le symbole €
        let price=parseInt(cartInfo.price)
        //je crée une nouvelle ligne de tableau
        let tbRow = document.createElement('tr')
        tbRow.setAttribute('class', 'line')
        console.log(tbRow)
        //données nouvelle ligne: détail des produits séléctionnés, prix total par model choisi, icône "retirer du panier"
        tbRow.innerHTML = `
        <td><img src="${cartInfo.img}" alt="" width="80px" height="auto"></td>
        <td>Ajouté:  ${cartInfo.brand}  |  ${cartInfo.model}  |  QUANTITE: ${cartInfo.qty}  |  PRIX: ${cartInfo.qty*price} €</td>
        <td><img class="remove" src='./assets/remove-from-cart.png' alt="retirer"></td>`

        invoice.appendChild(tbRow)
        console.log(invoice)

        //la variable allPrice sert à récupérer les prix de chaque nouvelle ligne ainsi créée
        let allPrice = document.getElementsByClassName('line')
        console.log(allPrice)
        //je transforme la collection HTML en tableau, pour pouvoir parcourir ses éléments avec la fonction "forEach"
        allPrice = Array.from(allPrice)
        console.log(allPrice)
        //et j'appelle une fonction getTotal...
        getTotal(allPrice)
    }
}
//... qui récupère la somme totale par produit (dans le tableau récapitulatif)
function getTotal(allPrice) {
    let sum=0
    allPrice.forEach(item => {
        //je récupère la valeur en int de la dernière portion de la chaine de caractères affichée dans le tableau
        //des produits séléctionnés: -2 pour parser avant le symbole €, jusqu'au length-5
        sum += parseInt(item.children[1].innerHTML.slice(length -5,-2))
    });
    //et je l'injecte dans le TOTAL A PAYER
    document.getElementById('total').innerHTML = sum
}
//je définis la fonction qui retire une séléction du tableau récapitulatif
//et recalcule la valeur du TOTAL A PAYER
function removeFromCard(e) {
    let total = document.getElementById('total').innerHTML
    let totalConvert = parseInt(total)
    e.preventDefault();

    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove()
        let myPrice = parseInt(e.target.parentElement.parentElement.children[1].innerHTML.slice(length -5,-2))
        document.getElementById('total').innerHTML = totalConvert - myPrice;
    }
}

//problème à étudier: quand j'ajoute une sélection de produits, il m'insere une ligne dans le tableau récapitulatif
//si je refais une sélection du même produit, au lieu de m'actualiser la ligne existante, il va insérer une nouvelle...


//Burger nav:
let burger1 = document.getElementById('burger1');
let navUl = document.querySelector("nav>ul")
let check = false;
burger1.addEventListener('click', e => {
    check = !check;

    if(check) {
        navUl.classList.add('menuSlide')
    }
    else {
        navUl.classList.remove('menuSlide')
    }
});