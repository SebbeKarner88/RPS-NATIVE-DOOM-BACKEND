/* let audio = document.getElementById("backsound");
  audio.volume = 0.02;
 */

  function login(){
    const form = {
      username : document.querySelector(".usern").value,
      password : document.querySelector(".passw").value
    };


    rpsApi.login(form.username, form.password)
    /* .then(response => response.json()) */
    .then((player) => {
      if (!player.username){ /* Kan bli fel i backend pågrund av optional empty. */
      window.alert("Användarnamn/Lösenord är felaktigt.");
       
      }else {
        sessionStorage.setItem("token", player.token);
        sessionStorage.setItem("username", player.username);
        window.alert("Biipedy baapidy boopidy you are logged in!");
      }
    }); 
 
    
  }

  function register() {
    const form = {
      username: document.querySelector(".usern").value,
      password: document.querySelector(".passw").value
    }; 

    rpsApi.register(form.username, form.password)
    .then((player) => {
      console.log(player);
      if(player){
        console.log("Congrats you are registerd");
      }else {
        console.log("Username is already taken dumbass");
      }

    })
  }



  /* Hamburgarmenyn */  

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNavigation = document.querySelector(".primary-navigation");
  const webSiteNavigation = document.querySelector('#webMenu')

  if (!sessionStorage.getItem('username')) {

    let li = document.createElement('li');
   let liWeb = document.createElement('li');
   let a = document.createElement('a');
   let aWeb = document.createElement('a');
   a.append('login');
   aWeb.append('login');
   a.href = 'login.html';
   aWeb.href = 'login.html';
 
 
   li.appendChild(a);
   liWeb.appendChild(aWeb);
   siteNavigation.appendChild(li);
   webSiteNavigation.appendChild(liWeb);

  }
  if (sessionStorage.getItem('username')) {

    let li = document.createElement('li');
    let a = document.createElement('a');
    a.append('logout');
    a.href = '#';
    a.onclick = function() {
      sessionStorage.removeItem('username');
      location.assign('index.html');  
    }; 

    let liWeb = document.createElement('li');
    let aWeb = document.createElement('a');
    aWeb.append('logout');
    aWeb.href = '#';
    aWeb.onclick = function() {
      sessionStorage.removeItem('username');
      location.assign('index.html');  
    }; 
  
  
    li.appendChild(a);
    liWeb.appendChild(aWeb);
    webSiteNavigation.appendChild(li);
    siteNavigation.appendChild(liWeb);
  }


  menuToggle.addEventListener("click", () => {
    const isOpened = menuToggle.getAttribute("aria-expanded") === "true";
    isOpened ? closeMenu() : openMenu();
  });

function openMenu() {
  menuToggle.setAttribute("aria-expanded", "true");
  siteNavigation.setAttribute("data-state", "opened");
}


function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  siteNavigation.setAttribute("data-state", "closing");
  
  siteNavigation.addEventListener(
    "animationed",
    () => {
      siteNavigation.setAttribute("data-state", "closed");
    },
    { once: true }
    );
  }
  
/* ############################################################# */