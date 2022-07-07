fetch("/api/prueba")
    .then(res => res.json())
    .then(data => {console.log(data)})