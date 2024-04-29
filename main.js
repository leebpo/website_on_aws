fetch("https://9qctsu6m92.execute-api.us-east-1.amazonaws.com/prod/website-info")
  .then(response => {return response.json();})
  .then(data => {
    const body = JSON.parse(data.body);
    console.log(body);
    // render html
    const navNode = document.querySelector("#nav");
    renderNavbar(navNode);
  
    const mainNode = document.querySelector("main");
    renderMainPage(mainNode, body["Items"]);
});

function renderNavbar(navNode) {
  const navbarCode = navbarHTML();
  navNode.innerHTML += navbarCode;
}

function navbarHTML() {
  return `<nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="index.html#About#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="index.html#News">News</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="index.html#Projects">Projects</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
}

function renderMainPage(mainNode, data) {
  console.log(data);
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("project");
  const page = (projectId == null ? "main" : "project-detail");
  
  if (page == "main") {
    mainNode.innerHTML += mainHTML(data);
  } else {
    const project = data.find(item => item["id"] == "projects")["projects"].find(p => p["id"]==projectId);
    console.log(project);
    mainNode.innerHTML += projectPageHTML(project);
  }
}

function mainHTML(data) {
  const about = data.filter(item => item["id"] == "about")[0];
  const news = data.filter(item => item["id"] == "news")[0]["news"];
  const projects = data.filter(item => item["id"] == "projects")[0]["projects"];
  return `<div class="container text-left">
            <div class="row row-cols-2">
              <div class="col col-4">
                ${profileHTML(about)}
                ${newsHTML(news)}
                ${bioHTML(about["bio"])}
                ${projectsHTML(projects)}
              </div>
            </div>
          </div>`
}
    
function profileHTML(about) {
  return `<div class="card my-4">
              <img
                src=${about["photo"]}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">${about["name"]}</h5>
                <p class="card-text">
                  ${about["department"]} | ${about["university"]}
                </p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <span class="phone">${about["phone"]}</span>
                </li>
                <li class="list-group-item">
                  <span class="email">${about["email"]}</span>
                </li>
                <li class="list-group-item">
                  <span class="address">${about["address"]}</span
                  >
                </li>
              </ul>
              <div class="card-body">
                <a class="card-link" href=${about["resume"]}>Resume</a>
                <a class="card-link" href=${about["linkedin"]}>LinkedIn</a>
              </div>
            </div>`
}
  
function newsHTML(news) {
  return `<div class="card my-4" id="News">
              <h5 class="card-header">News</h5>
              <ul class="list-group list-group-flush">
                ${news.map((n) => {
                    return `<li class="list-group-item">${n["date"]} - ${n["title"]}</li>`
                    }).join("")
                  }
              </ul>
            </div>
          </div>`
}

function bioHTML(bio) {
  return `<div class="col col-8" id="bio">
            <h4 class="my-4" id="About">About</h4>
            <div class="card mt-3 mb-4">
              <div class="card-body">
                ${bio}
              </div>
            </div>`
}

function projectsHTML(projects) {
  return `<h4 class="my-4" id="Projects">Projects</h4>
          ${projects.map((p) => {
            return `<div class="card my-4" id=${p["id"]}>
            <h5 class="card-header">
              <a href="index.html?project=${p["id"]}">
                ${p["title"]}
              </a>
            </h5>
            <div class="card-body">
              ${p["description"]}
            </div>
          </div>`
          }).join("")}
          `
}

function projectPageHTML(project) {
  return `<h4 class="mt-3 mx-5"> ${project["title"]}</h4>
      <div class="card mb-3 mx-5" style="max-width: 100%">
        <div class="row g-0">
          <div class="col-md-4">
            <a
              href=${project["material"]["link"]}
              ><img
                src=${project["material"]["image"]}
                class="img-fluid rounded-start"
                alt="..."
            /></a>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text">
                ${project["description"]}
              </p>
            </div>
          </div>
        </div>
      </div>`
}