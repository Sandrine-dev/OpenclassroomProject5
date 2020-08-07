const strRequete = window.location.search; // pour trouvé et ouvrire la bonne page id
//console.log(strRequete);
const urlParam = new URLSearchParams(strRequete);
//console.log(urlParam);

let produitsP = document.getElementById ("ProduitP"); // appel de l'id ProduitP
let achat = document.getElementById ("achat");

/*let choix = document.createElement("select");
choix.className = "liste";
achat.appendChild(choix);
let vide = document.createElement ("option");
    vide.textContent = " ";
    vide.value = " ";
choix.appendChild(vide);*/

let choix = document.getElementById("choix");


let ours = new XMLHttpRequest (); //création de la variable requête

ours.onreadystatechange = function (){ // traitement de la requête
    //console.log (this);

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.response);
        let couleurs = data.colors;
        let prix = data.price / 100;
        //console.log(couleurs);
        //console.log (this.response);
        let presentation = "<h5 class='Nom card-title'> Je m'appelle " + data.name + "!</h5>";
            presentation += "<img class='Images card-img-top' src=" + data.imageUrl + " alt= " + data.name + ">";
            presentation += "<p class='Description card-txt'>" + data.description + "</p>"
        let bouton = "<h6>" + prix + " €</h6>";
            bouton += "<button type='button' id='ajout-panier' data-id='" + data.id + "' data-name='" + data.name + "' data-price='" + data.price / 100 + "' class='btn bg-brown text-white'> ajoutez au panier </button>";

            //console.log(presentation);
            //console.log(bouton);

        for (let i=0; i< couleurs.length; i++ ){
            let opt = couleurs[i];
            let el = document.createElement("option");
                el.textContent = opt;
                el.value= opt;
            choix.appendChild(el);
        }


        produitsP.innerHTML += presentation;
        achat.innerHTML += bouton;

        let ajoutPanier = document.getElementById("ajout-panier");
            ajoutPanier.addEventListener('click', () => {
                //console.log("ajouté au panier");

                let choixCouleur = document.getElementById("choix").value; //afin de faire l'avertissement si la valeur est null

                if (choixCouleur === ""){
                    alert ("Veuillez choisir une couleur!");
                }

                //stockPanier(data);
                //prixTotal(prix);
        })

        function stockPanier(data) {
            //console.log ("le produit choisie est ", data);
            let produits = localStorage.getItem ("produits");
            //console.log(produits);
            //console.log(typeof produits);
            produits = parseInt(produits);

            if(produits){ //pour ajouter plusieurs fois
                localStorage.setItem("produits", produits + 1);
            } else {
                localStorage.setItem("produits", 1);
            }
            //setItem(data);
        }

        function setItem(data){
            //console.log("mon produit est", data);
            let produitPanier = localStorage.getItem("produitsPanier");
            produitPanier = JSON.parse(produitPanier);

        //rajouter un if pour le nom du produit ou l'id.
            if (produitPanier != null) {
                if(produitPanier == undefined) {
                    produitPanier = {
                        ...produitPanier,
                        [data.name] : data
                    }
                }
                produitPanier[data.name] += 1;
                
            } else {
                produitPanier = 1;
                produitPanier = {
                    [data.name]: data
                }
            }

            localStorage.setItem("produitPanier", JSON.stringify(produitPanier));
            //console.log("mes produits sont", produitPanier);
            
        }


        function prixTotal(prix) {
            //console.log("Le prix est", data.price / 100);
            let prixPanier = localStorage.getItem("PrixTotal");

            if(prixPanier != null){
                prixPanier = parseInt(prixPanier);
                localStorage.setItem("PrixTotal", prixPanier + prix);
            } else {
                localStorage.setItem("PrixTotal", prix);
            }

            //console.log("mon panier coûte", prixPanier);
        };



    } else if (this.readyState == 4 && this.status == 400){
        alert ("Erreur 404!");
    };
    
};


/*let quantite = document.createElement("select");
quantite.className = "Quantite";
achat.appendChild(quantite);

let x = 10;

for ( let i=0; i < x; i++){
    let qte = i;
    let ol = document.createElement("option");
    ol.textContent = qte;
    ol.value = qte;
    quantite.appendChild(ol);
}*/



ours.open ("GET", "http://localhost:3000/api/teddies/"+ urlParam.get('id'),true); 
ours.send (); //envoie de la requête