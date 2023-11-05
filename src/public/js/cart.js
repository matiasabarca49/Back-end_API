const addToCart = async (product)=>{
    let user;
    try{
        const resUser = await fetch(`http://localhost:8080/api/sessions/current`)
        user = await resUser.json()
        //Los usuarios no pueden agregar sus propios productos
        if(user.currentUser.email === product.owner || user.currentUser.rol === "Admin"){
            const modal = document.getElementById("modalWarningRolUser")
            if(user.currentUser.email === product.owner){
                modal.innerText = "Los Usuarios Premium no pueden agregar sus propios productos"
            }
            else{
                modal.innerText = "Los Administradores no pueden comprar productos"

            }
            modal.style.display = "block"
            setTimeout(()=>{
                modal.style.display = "none"
            },7000)
        }else{
            const resToProductSended = await fetch(`http://localhost:8080/api/users/addcart`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product)
            })
            const data = resToProductSended.json()
            totalProducts()
        }

    }
    catch(error){
        if(!user){
            window.location.href = "http://localhost:8080/api/sessions/login"
        }
        else{
            console.log("Error al Agregar el producto al carrito")
        }
    }
}

const totalProducts = async ()=>{
    let cant
    try{
        const resUser = await fetch(`http://localhost:8080/api/sessions/current`)
        const user = await resUser.json()
        cant = user.currentUser.cart.reduce((acumlador, product) => acumlador + product.quantity, 0)
    }
    catch{
        cant = 0
    }
    const totalCountNav = document.getElementById("totalCountNav")
    totalCountNav.innerText = cant
}



