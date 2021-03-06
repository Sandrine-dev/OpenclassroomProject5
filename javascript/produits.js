const strRequete = window.location.search; // pour trouvé et ouvrire la bonne page id
//console.log(strRequete);
const urlParam = new URLSearchParams(strRequete);
//console.log(urlParam);

let produitsP = document.getElementById ("ProduitP"); // appel de l'id ProduitP
let achat = document.getElementById ("achat");
let choix = document.getElementById("choix");

let ol = document.createElement("option");
    ol.textContent = "";
choix.appendChild(ol);


let ours = new XMLHttpRequest (); //création de la variable requête

ours.onreadystatechange = function (){ // traitement de la requête
    //console.log (this);

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.response);
        let couleurs = data.colors;
        let prix = data.price / 100;
        //console.log(couleurs);
        //console.log (this.response);
        let presentation = "<h5 class='Nom card-title'>Rencontrez " + data.name + "!</h5>";
            presentation += "<img class='Images card-img-top' src=" + data.imageUrl + " alt= " + data.name + ">";
            presentation += "<p class='Description card-txt'>" + data.description + "</p>"
        let bouton = "<h6>" + prix + " €</h6>";
            bouton += "<button type='button' id='ajout-panier' data-id='" + data.id + "' data-name='" + data.name + "' data-price='" + prix / 100 + "' class='btn bg-brown'> ajoutez au panier </button>";

            //console.log(presentation);
            //console.log(bouton);

        for (let i=0; i< couleurs.length; i++ ){ //Création des option de la liste déroulante
            let opt = couleurs[i];
            let el = document.createElement("option");
                el.textContent = opt;
                el.value= opt;
            choix.appendChild(el);
        }


        produitsP.innerHTML += presentation;
        achat.innerHTML += bouton;

        let ajoutPanier = document.getElementById("ajout-panier"); //Création de l'enventlistener pour chaque clique sur ajout panier
            ajoutPanier.addEventListener("click", () => {
                //console.log("ajouté au panier");

            let choixCouleur = document.getElementById("choix").value; //afin de faire l'avertissement si la valeur est null

            if (choixCouleur === ""){
                alert ("Veuillez choisir une couleur!");
            }
            else{
                stockPanier(data);
            }

        })
        
        function stockPanier(data) { //création de la fonction pour le localStorage
            //console.log ("le produit choisie est ", data);
            let idJson = localStorage.getItem (data._id); //Envois des information au localStorage d'après l'id
            let qte = localStorage.getItem ("ProduitPanier"); //Envois au localStorage la quantité

            //console.log(typeof produits);
            // produits = parseInt(produits);
            if (qte === null){
                localStorage.setItem("ProduitPanier" , 1 );
            }
            else {
                let i_qte = parseInt(qte);
                localStorage.setItem("ProduitPanier" , i_qte + 1);
           }
           
           if(idJson === null){ 
               data.qte = 1; //Création du nouvelle cas dans le tableau data : la quantité
               localStorage.setItem(data._id, JSON.stringify(data));
                
            } 
            else {
                let list = JSON.parse(idJson);
                let qteID = list.qte;
                let i_qteID = parseInt(qteID)+1;
                list.qte = i_qteID;
                localStorage.setItem(data._id, JSON.stringify(list));
            }

            
        }


    } 
    else if (this.readyState == 4 && this.status == 400){
        alert ("Erreur 404!");
    };
    
};

//console.log("http://localhost:3000/api/teddies/"+ urlParam.get('id'));
ours.open ("GET", "http://localhost:3000/api/teddies/"+ urlParam.get('id'),true); 
ours.send (); //envoie de la requête