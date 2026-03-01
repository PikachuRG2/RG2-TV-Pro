var firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
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
  .then(function(snapshot){
    snapshot.forEach(function(doc){
      var c = doc.data();
      lista.innerHTML += `
      <div class="canal" onclick="assistir('${c.link}')">
        ${c.nome}
      </div>`;
    });
  });
}

function assistir(link){
  var video = document.getElementById("video");

  if(Hls.isSupported()){
    var hls = new Hls();
    hls.loadSource(link);
    hls.attachMedia(video);
  }else{
    video.src = link;
  }
}
