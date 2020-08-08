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

//  affichage Total