/* let audio = document.getElementById("backsound");
  audio.volume = 0.02;
 */
 /* Hamburgarmenyn */  

 const menuToggle = document.querySelector(".menu-toggle");
 const siteNavigation = document.querySelector(".primary-navigation");
 const webSiteNavigation = document.querySelector('#webMenu')

 if (!rpsApi.getUsername()) {

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
 if (rpsApi.getUsername()) {

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
   webSiteNavigation.appendChild(liWeb);
   siteNavigation.appendChild(li);
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