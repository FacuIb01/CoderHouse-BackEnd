let data = fetch("/api/productos")
.then(res => res.json())
.then(data => console.log(data))