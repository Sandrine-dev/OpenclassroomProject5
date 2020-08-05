const strRequete = window.location.search; // pour trouvé et ouvrire la bonne page id
//console.log(strRequete);
const urlParam = new URLSearchParams(strRequete);
//console.log(urlParam);

let produitsP = document.getElementById ("ProduitP"); // appel de l'id ProduitP
let choix = document.createElement("select");
choix.className = "liste"
produitsP.appendChild(choix);


let ours = new XMLHttpRequest (); //création de la variable requête

ours.onreadystatechange = function (){ // traitement de la requête
    //console.log (this);

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.response);
        let couleurs = data.colors;
        //console.log(couleurs);
        //console.log (this.response);
        let presentation = "<h5 class='Nom card-title'> Je m'appelle " + data.name + "!</h5>";
            presentation += "<img class='Images card-img-top' src=" + data.imageUrl + " alt= " + data.name + ">";
            presentation += "<p class='Description card-txt'>" + data.description + "</p>"
            presentation += "<h6>" + data.price / 100 + " €</h6>";

        for (let i=0; i< couleurs.length; i++ ){
            let opt = couleurs[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value= opt;
            choix.appendChild(el);
        }

        produitsP.innerHTML += presentation;


    } else if (this.readyState == 4 && this.status == 400){
        alert ("Erreur 404!");
    };
};


ours.open ("GET", "http://localhost:3000/api/teddies/"+ urlParam.get('id'),true); 
ours.send (); //envoie de la requête
