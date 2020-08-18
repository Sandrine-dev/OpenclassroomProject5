let produit = document.getElementById ("Produits"); //Création de la variable produit sur l'id 'Produits'
let teddy = new XMLHttpRequest (); //Création de la variable Teddy qui va afficher la requête server

teddy.onReadyStateChange = function (){ //function pour aller chercher sur le server les infos utiles
    //console.log(this);

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.response); 
        //console.log (this.response);
        
        for ( let i=0; i < data.length; i++ ) { // création de la boucle pour demander TOUT les produits
            let tout = document.createElement("div");
            tout.className = "card"; // création d'une div ou les élémént (nom, image et id) seront présent
            tout.innerHTML = createDiv(data[i]); 
            produit.appendChild(tout);
        }

    } else if (this.readyState == 4 && this.status == 404){
        alert ("Erreur 404"); // si jamais erreure 404
    };
};

teddy.open("Get", "http://localhost:3000/api/teddies", true); //ouverture du fichier, true (pour l'async)
teddy.send(); //s'il faut renvoyer des infos au server

function createDiv (data){
    let html = "<h5 class='Nom card-title'>Rencontrez " + data.name + "</h5>";
    html += "<img class='Images card-img-top' src=" + data.imageUrl + " alt= " + data.name + ">"; 
    html += "<a href='produit.html?id=" + data._id +"'><button type='button' id=" + data._id + " class='btn bg-brown'> Voir produit </button> </a>"; //création variable html pour avoir les infos afficher sur le site

    return html; //function affiché
};