let total = 0;
let table = document.getElementById("cart-tablebody");
let totalPanier  = document.getElementById("Total");
let lastName = document.getElementById("nom");
let firstName = document.getElementById("prenom");
let address = document.getElementById("adresse");
let city = document.getElementById("ville");
let email = document.getElementById("email");

let products = [];
let Contact = {};
let data = {};
let html = "" ;

//console.log(localStorage.length);
               

for(let i = 0; i < localStorage.length ; ++i){
    let clef = localStorage.key(i);
    if ( clef !== "ProduitPanier"){
        //console.log(clef);
        let ligne = JSON.parse( localStorage.getItem(clef));
        html += "<tr>"; 
        html += "<td>"+ligne._id+"</td>";  
        html += "<td>"+ligne.name+"</td>";
        html += "<td>"+ligne.price/100+" €</td>";
        html += "<td>"+ligne.qte+"</td>";
        html += "<td>"+ligne.qte*ligne.price/100+" €</td>";
        html+= "</tr>";
        total += ligne.qte*ligne.price/100;
        let i = ligne._id;
        products.push(i);
    }
}

//console.log(listID);
//console.log(html);
table.innerHTML = html;
totalPanier.innerHTML = total;

let viderPanier= document.getElementById("vider");
    viderPanier.addEventListener("click" , () => {
        localStorage.clear();
        location.reload();
    })

function validation(){

    
    if(lastName.value.length <2 || lastName.value.length>30){
        alert ("Veuillez remplir correctement le champ Nom!");
        return false;
    }   
    if(firstName.value.length <2 || firstName.value.length>30){
        alert( "Veuillez remplir correctement le champ Prénom!");
        return false;
    }
    if(address.value.length <5 || address.value.length>250){
        alert( "Veuillez remplir correctement le champ adresse!");
        return false;
    }
    if(city.value.length <2 || city.value.length>70){
        alert( "Veuillez remplir correctement le champ ville!");
        return false;
    }
    if(email.value.indexOf("@") == -1 || email.value.length <5 || email.value.indexOf(".") ==-1 || email.length >250){
        alert( "Veuillez remplir correctement le champ email!");
        return false;
    }
    return true;
};

function sending(url, order) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function (response) {
           if (this.readyState == 4 && this.status == 201) {
                resolve (JSON.parse(this.responseText).orderId);
                
            } else if (this.readyState == 4 && this.status == 404){
                reject ("fail !!!!");
            }
        };
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(order);
    });
};



let commande = document.getElementById("commande");
commande.addEventListener("click", () => {


    if(validation() == true){

        Contact["lastName"] = lastName.value;
        Contact["firstName"] = firstName.value;
        Contact["address"] = address.value;
        Contact["city"] = city.value;
        Contact["email"] = email.value;

        //console.log(contact);


        data["contact"] = Contact;
        data["products"] = products;

        //console.log(data);
        //console.log(JSON.stringify(data));

        let dataJson = JSON.stringify(data);

        //console.log(datajson);

        sending("http://localhost:3000/api/teddies/order", dataJson).then(function (orderId) { 
            localStorage.clear();
            localStorage.setItem("contact",  JSON.stringify(Contact));
            localStorage.setItem("total", total);
            localStorage.setItem("orderId", orderId);
            window.location.href = "confirmation.html";
        }, function (failed){console.log(failed);});
    }
       
});