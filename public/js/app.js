const socket = io();

// socket.on('productos', async (productos) => {
//     // console.log(productos)
//     // const archivo = await fetch('clase12/tabla.hbs')
//     // const template = await archivo.text()
//     // const tablaHtml = Handlebars.compile(template, productos);
//     // console.log(template)
//     // console.log(template)
//     // console.log(archivo)
//     // document.getElementById('productos').innerHTML = tablaHtml

// })  
socket.on('productos',  productos => {
    console.log(productos)
    if(productos.length){
        const template = Handlebars.compile(
            `
            <br><br>
            <div class="container"> 
                <div class="d-flex justify-content-center"> 
                    <h1 style="color: blue;">Listado de Productos</h1>
                </div>
                <table class="table table-hover table-dark">
                <thead>
                    <tr>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">PRECIO</th>
                    <th scope="col">FOTO</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each products}} 
                    <tr>
                        <td>{{this.title}}</td>
                        <td>{{this.price}}</td>
                        <td><img src="{{this.thumbnail}}" alt="" height="50px"></td>
                    </tr>
                    {{/each}}
                </tbody>
                </table>
            </div>
            `
            );
            const html=template(
                {
                    products: productos
                }
            )
            document.querySelector("#productos").innerHTML=html
    }else{
        const template = Handlebars.compile(
            `
            <br><br>
            <div class="container"> 
                <h1 style="color: blue;">No se encontraron productos</h1>
                <div class="d-flex justify-content-center align-items-center" style="height:50vh">
                    <img src="https://www.iamqatar.qa/assets/images/no-products-found.png" alt="">
                </div>
            </div>
            `
            );
            const html=template(
                {
                    products: productos
                }
            )
            document.querySelector("#productos").innerHTML=html

    }
})  

document.getElementById("sendData").addEventListener("click", ()=>{
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const data = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    socket.emit("act", data)
    document.getElementById("formSender").reset();
    // socket.emit("act")
})