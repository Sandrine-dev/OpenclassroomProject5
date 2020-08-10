let total = 0;
let table = document.getElementById("cart-tablebody");
let totalPanier  = document.getElementById("Total");
//console.log(localStorage.length);
let html = "" ;

for(let i = 0; i < localStorage.length ; ++i){
    let clef = localStorage.key(i);
    if ( clef != "ProduitPanier"){
        console.log(clef);
        let ligne = JSON.parse( localStorage.getItem(clef));
        html += "<tr>";
        html += "<td>"+ligne._id+"</td>";    
        html += "<td>"+ligne.name+"</td>";
        html += "<td>"+ligne.price/100+" €</td>";
        html += "<td>"+ligne.qte+"</td>";
        html += "<td>"+ligne.qte*ligne.price/100+" €</td>";
        html+= "</tr>";
        total += ligne.qte*ligne.price/100;

    }

}

console.log(html);
table.innerHTML = html;
totalPanier.innerHTML = total;

let commande = document.getElementById("commande");
    commande.addEventListener("click", () => {

    let nom = document.getElementById("nom");
    let prenom = document.getElementById("prenom");
    let adresse = document.getElementById("adresse");
    let ville = document.getElementById("ville");
    let email = document.getElementById("email");


    if(nom.value.length <2 || nom.value.length>30){
        alert ("Veuillez remplir correctement le champ Nom!");
        return false;
    }   
    if(prenom.value.length <2 || prenom.value.length>30){
        alert( "Veuillez remplir correctement le champ Prénom!");
        return false;
    }
    if(adresse.value.length <5 || adresse.value.length>250){
        alert( "Veuillez remplir correctement le champ adresse!");
        return false;
    }
    if(ville.value.length <2 || ville.value.length>70){
        alert( "Veuillez remplir correctement le champ ville!");
        return false;
    }
    if(email.value.indexOf("@") == -1 || email.value.length <5 || email.value.indexOf(".") ==-1 || email.value.length >250){
        alert( "Veuillez remplir correctement le champ email!");
        return false;
    };
    return true;

})