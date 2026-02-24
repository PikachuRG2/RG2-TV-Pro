var firebaseConfig = {
  apiKey: "AIzaSyCI8ArQt-1KgPjue7hROhGIKa-m8cF90a4",
  authDomain: "rg2-tv-pro.firebaseapp.com",
  projectId: "rg2-tv-pro",
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();

function login(){
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("Logado:", result.user.email);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login");
    });
}
function carregar(cat){
  var lista = document.getElementById("lista");
  lista.innerHTML="";

  db.collection("canais")
  .where("categoria","==",cat)
  .get()
 .then((snapshot) => {

      snapshot.forEach((doc) => {
        const c = doc.data(); // 👈 ESSA LINHA É OBRIGATÓRIA
      lista.innerHTML += `
      <div class="canal" onclick="assistir('${c.link}')">
        ${c.nome}
      </div>`;
    });
  });
}

snapshot.forEach((doc) => {
   const c = doc.data();
   console.log(c.nome);
});


function assistir(link){
  var video = document.getElementById("video");

  if(Hls.isSupported()){
    var hls = new Hls();
    hls.loadSource(link);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      video.play();
    });
  } else {
    video.src = link;
    video.play();
  }
}
  });
});

