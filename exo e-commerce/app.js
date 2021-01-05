fetch("https://jsonplaceholder.typicode.com/users")
.then((resultat)=> {
    return resultat.json();
})
.then ((myData)=> {
    showData(myData)
    console.log(myData)
})
.catch((erreur) => {
console.log(erreur);
})

function showData(myData) {
    let ctn = document.getElementById("result");
    for (let i=0;i<myData.length; i++) {
        let row = document.createElement("tr")
        let cell0 = document.createElement("td")
        let cell1 = document.createElement("td")
        let cell2 = document.createElement("td")
        let cell3 = document.createElement("td")
        let cell4 = document.createElement("td")
        let cell5 = document.createElement("td")
        cell0.innerHTML = `${myData[i].id}`
        cell1.innerHTML = `${myData[i].name}`
        cell2.innerHTML = `${myData[i].username}`
        cell3.innerHTML = `${myData[i].email}`
        cell4.innerHTML = `${myData[i].address.street + " street, " + myData[i].address.suite + " - " + myData[i].address.city + " "+myData[i].address.zipcode}`
        cell5.innerHTML = `${myData[i].phone}`
        row.appendChild(cell0)
        row.appendChild(cell1)
        row.appendChild(cell2)
        row.appendChild(cell3)
        row.appendChild(cell4)
        row.appendChild(cell5)
        ctn.appendChild(row)
    }
}

let burger2 = document.getElementById('burger2');
let navUl = document.querySelector("nav>ul")
let check = false;
burger2.addEventListener('click', e => {
    check = !check;

    if(check) {
        navUl.classList.add('menuSlide')
    }
    else {
        navUl.classList.remove('menuSlide')
    }
});