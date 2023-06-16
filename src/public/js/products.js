
const renderProducts = (array)=>{
    const contProducts = document.getElementById('products')
    contProducts.innerHTML= ""
    array.forEach(product => {
        const div = document.createElement('div')
        div.className= " col-2 col-6 col-sm-4 card  mb-3 flex-grow-1 shadow"
        div.style.maxWidth= "18rem"
        div.innerHTML= 
                    `
                        <div class="card-header bg-transparent ">
                            <p class="card-text"><small class="text-body-secondary">${product.category}</small>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title fs-4 text fw-bold">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                        </div>
                        <div class="card-footer bg-transparent fs-4 text d-flex justify-content-between "> $ 
                            ${product.price}
                            <a class="btn btn-success" href="http://localhost:8080/products/productview?id=${product._id}">Ver Más</a>
                        </div>
                    `
        contProducts.appendChild(div)
    });
}

//Funcion que renderiza la botonera de paginas
const renderBotonPage = (data) => {
    const pageCurrent = document.getElementById("currtPag")
    pageCurrent.innerHTML= `${data.page}`
}

//Funcion que nos pemite renderizar los elementos con paginate
const fetchProducts = (page)=>{
    //Obtenemos los productos de la pagina pasada por parametro
    fetch(`http://localhost:8080/api/products?page=${page}`)
    .then( response => response.json())
    .then( data => {
        products = data
        //Una vez obtenido los productos se llama la funcion que los renderiza en el DOM
        renderProducts(data.payload)
        renderBotonPage(data)
    })
}

//Algoritmo Principal

let page = 1, limit, sort, query
let products = []

fetchProducts(page)

//Evento que permite renderizar los elementos de la pagina siguiente
const nextPag = document.getElementById("nextPag")
nextPag.addEventListener("click", ()=>{
    page = products.nextPage
    //Evita que se llame la funcion si la proxima pagina es "null"
    page && fetchProducts(page)
})
//Evento que permite renderizar los elementos de la pagina anterior
const prevPag = document.getElementById("prevPag")
prevPag.addEventListener("click", ()=>{
    page = products.prevPage
    page && fetchProducts(page)
})

