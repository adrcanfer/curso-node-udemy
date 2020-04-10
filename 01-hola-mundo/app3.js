console.log("Inicio del programna");

setTimeout(() => {
    console.log("Primer timeout")
}, 3000);

setTimeout(() => {
    console.log("Segunodo timeout")
}, 0);

setTimeout(() => {
    console.log("Tercer timeout")
}, 0);

console.log("Fin del programa");