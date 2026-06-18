function showDocuments(){

const service =
document.getElementById("service").value;

const result =
document.getElementById("documentsResult");

result.innerHTML = "";

let docs = [];

if(service === "income"){

docs = [
"Aadhaar Card",
"Passport Size Photo",
"Mobile Number",
"Residence Proof"
];

}

else if(service === "caste"){

docs = [
"Aadhaar Card",
"Photo",
"Family Certificate",
"Residence Proof"
];

}

else if(service === "ayushman"){

docs = [
"Aadhaar Card",
"Ration Card",
"Mobile Number"
];

}

else if(service === "pan"){

docs = [
"Aadhaar Card",
"Photo",
"Mobile Number"
];

}

docs.forEach(function(item){

result.innerHTML += `
<div class="card">
<h2>${item}</h2>
<p>Required Document</p>
</div>
`;

});

}