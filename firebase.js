var firebaseConfig = {
  apiKey: "AIzaSyCI8ArQt-1KgPjue7hROhGIKa-m8cF90a4",
  authDomain: "rg2-tv-pro.firebaseapp.com",
  projectId: "rg2-tv-pro",
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();

function login(){
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

auth.onAuthStateChanged(function(user){
  if(user){
    document.getElementById("loginArea").style.display="none";
    document.getElementById("app").style.display="block";
  }
});

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


var hls;

function assistir(link){
  var video = document.getElementById("video");

  // Se já existir player anterior, destruir
  if(hls){
    hls.destroy();
  }

  if(Hls.isSupported()){
    hls = new Hls({
      maxBufferLength: 10,        // menor buffer = inicia mais rápido
      maxMaxBufferLength: 20,
      startLevel: -1,
      liveSyncDurationCount: 3    // mais rápido em canais ao vivo
    });

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
