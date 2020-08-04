var produit = document.getElementById ("Produits"); //Création de la var produit sur l'id 'Produits'
var teddy = new XMLHttpRequest (); //Création de la var Teddy qui va afficher la requête server

teddy.onreadystatechange = function (){ //function pour aller chercher sur le server les infos utiles
    console.log(this);
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response); //Création de la var data qui synchronise la demande sur Json
        for ( var i=0; i < data.length; i++ ) { // création de la boucle pour demander TOUT les produits
            var toot = document.createElement("div");
            toot.className = "card"; // création d'une div ou les élémént (nom, image et id) seront présent
            toot.innerHTML = createDiv(data[i]); 
            produit.appendChild(toot);
        }
    } else if (this.readyState == 4 && this.status == 404){
        alert ("Erreur 404"); // si jamais erreure 404
    };


};

teddy.open("Get", "http://localhost:3000/api/teddies", true); //Le server ou chercher les informations
teddy.send(); //si il faut renvoyer des infos au server

function createDiv (data){
    var html = "<h5 class='Nom'>" + data.name + "</h5>";
    html += "<img class='Images card-img-top' src=" + data.imageUrl + ">"; 
    html += "<button type='button' id=" + data.id + " class='btn bg-brown text-white'> voir produit </button>"; //création var html pour avoir les infos afficher sur le site

    return html; //function affiché
};