function getPaste() {
    var urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.pathname);
    console.log(urlParams.toString());
    document.getElementById("test").innerText = urlParams.toString();
    console.log(urlParams.get("id"));
    // await fetch(`/api/paste/$(urlParams.)`).then(
    //     function(response) {
    //         console.log(
    //             JSON.stringify(
    //                 response.json()
    //             )
    //         )
    //     },console.log("whoops")
    fetch("/api/paste/"+urlParams.get("id"))
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(JSON.stringify(myJson));
        });
}