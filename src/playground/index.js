var today = new Date(); // Or Date.today()
var tomorrow = new Date(today.getTime()+1000*60*60*24);

// console.log(tomorrow.getDate());
// console.log((new Date(tomorrow.getTime()-1000*60*60*24)).getDate());

console.log(today.getTime());
