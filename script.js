Swal.fire('Bienvenido/a a Mateá')

class Yerba {
    constructor(data) {
        this.marca = data.marca;
        this.precio = parseFloat(data.precio);
        this.stock = 10;
        this.id = Yerba.ID;
        this.img = data.img
        Yerba.ID++;
    }

    static ID = 1

    sumaIva() {
        return this.precio = this.precio * 1.21;
    }

    vender() {
        if (this.stock === 0) {
            console.log ("Nos quedamos sin stock del producto seleccionado")
        } else{
            console.log("Vendido")
            this.stock--;
        }
    }

    reponer() {
        this.stock += 10;
    }
}

let almacen = []

let contenedor = $('#productos');
contenedor.html("")

let carrito = [];

$.getJSON('yerbas.json', function (data) {
    for (const producto of data) {
        let nuevaYerba = new Yerba (producto);
            almacen.push(nuevaYerba)
        }
    }).then(function() {
        for (const producto of almacen) {
    
            contenedor.append(`<div id="yerbas"><h3> ${producto.marca}</h3>
                                    <img src="${producto.img}" width="100px">
                                    <b> Precio: $ ${producto.precio}</b>
                                    <button id="btnAgregar${producto.id}">Agregar al carrito🛒</button>
                                    </div>`
            )
        }
        $('#btnAgregar1').on('click', function () {agregarElemento (1)})

        $('#btnAgregar2').on('click', function () {agregarElemento (2)})
    
        $('#btnAgregar3').on('click', function () {agregarElemento (3)})
    
        $('#btnAgregar4').on('click', function () {agregarElemento (4)})
    
        $('#btnAgregar5').on('click', function () {agregarElemento (5)})
    
        $('#btnAgregar6').on('click', function () {agregarElemento (6)})
    
        $('#btnAgregar7').on('click', function () {agregarElemento (7)})
    
        $('#btnAgregar8').on('click', function () {agregarElemento (8)})
    
        $('#btnAgregar9').on('click', function () {agregarElemento (9)})
    
        $('#btnAgregar10').on('click', function () {agregarElemento (10)})
    
        function agregarElemento(productoID) {
            let producto = almacen.find((p => p.id == productoID))
            
            producto = almacen.find(function (producto) {
                if(producto.id == productoID)
                    return true;
                else
                    return false;
            })
            carrito.push(producto);
            saveLocal(carrito)
            mostrarCarrito();
            Swal.fire(`Se ha agregado el producto: ${producto.marca}`);
        }
})

function saveLocal(param){
    sessionStorage.setItem("Yerba", JSON.stringify(param));
}

function mostrarCarrito() {
    let contenedor = document.getElementById("carrito");
    let precioTotal = 0

    contenedor.innerHTML = "";
    htmlString = "<h3>CARRITO</h3> <ul>";
    for(const id in carrito ) {
        let producto = carrito[id]
        htmlString += `
            <li> <h4>${producto.marca}, $ ${producto.precio}
            <button id="carrito_${id}" class="eliminar"> 🗑️</button>
            </li></h4>`
        precioTotal += producto.precio;
    }
    htmlString += "</ul>";

    contenedor.innerHTML = htmlString;

    let contenedorPrecio = document.getElementById("precio");
    contenedorPrecio.innerHTML = `<h3>TOTAL: ${precioTotal}</h3>
    <button id="btnFinalizar">Finalizar compra</button>`;

    let botonFinalizar = document.getElementById("btnFinalizar")
    botonFinalizar.onclick = () =>{finalizarCompra()}

function finalizarCompra() {
    Swal.fire(`El monto a pagar es $${precioTotal}`)
}
    loadEliminar();
}

function loadEliminar() {
    let botones = document.getElementsByClassName("eliminar");
    for(const boton of botones) {

        boton.onclick = () => {
            let id = boton.getAttribute("id");
            idNumber = id.split("_")[1]
            carrito.splice(idNumber, 1)
            
            mostrarCarrito()
        }
    }
}

$("header").append('<button id="btnCarrito">🛒</button>')
$("header").append(`
    <div id="carrito" style="display: none;">
    </div>
`)

let flag = true;
$("#btnCarrito").click(() => {
    if (flag) {
        $("#carrito").slideDown("slow", () => {
            $("#btnCarrito").html("🛒");
        });
    }
    else{
        $("#carrito").slideUp("slow", () => {
            $("#btnCarrito").html("🛒");
        })
    }
    flag = !flag;
});