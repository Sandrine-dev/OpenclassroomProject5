let produitsP = document.getElementById ("ProduitP"); // appel de l'id ProduitP
let ours = new XMLHttpRequest (); //création de la variable requête
let choix = document.createElement("div");
produitsP.appendChild(choix);

const strRequete = window.location.search; // pour trouvé et ouvrire la bonne page id
//console.log(strRequete);
const urlParam = new URLSearchParams(strRequete);
//console.log(urlParam);

ours.onreadystatechange = function (){ // traitement de la requête
    //console.log (this);

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.response)
        //console.log (this.response);
        let presentation = "<h5 class='Nom card-title'> Je m'appelle " + data.name + "!</h5>";
        presentation += "<img class='Images card-img-top' src=" + data.imageUrl + " alt= " + data.name + ">";
        presentation += "<p class='Description card-txt'>" + data.description + "</p>"
        presentation += "<h6>" + data.price + " €</h6>";

        produitsP.innerHTML += presentation;

    } else if (this.readyState == 4 && this.status == 400){
        alert ("Erreur 404!");
    };
};


ours.open ("GET", "http://localhost:3000/api/teddies/"+ urlParam.get('id'),true); 
ours.send (); //envoie de la requête

