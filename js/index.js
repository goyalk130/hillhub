let home = document.getElementById("home");

let LoginSingupButtonCon = document.querySelector(".home-action-con");
let loginbtn = document.getElementById("login-btn");
let signupbtn = document.getElementById("signup-btn");

let session = document.querySelector(".session");
let form = document.querySelector(".login");
let username = document.querySelector(".username");
let pass = document.querySelector(".password");
let moveback = document.getElementById("back-to-login-screen");

let formheading = document.querySelector(".form-heading");
let loginsignupbtn = document.getElementById("loginb");

// Dashboard
let dashboard = document.getElementById("dashboard");
let addbutton = document.getElementById("add-items");

let loggedInUserEle = document.querySelector(".looged-in-user");
let logoutButton = document.getElementById("logout")

loggedInUserEle.innerHTML = getCurrentUser();
if (localStorage.getItem("CURRENT_LOGGED_IN_USER") == null) {
  localStorage.setItem("CURRENT_LOGGED_IN_USER", "");
}

function checkuser() {
  if (getCurrentUser() != "") {
    dashboard.style.display = "flex";
    home.style.display = "none";
  }else{
    dashboard.style.display = "none";
    home.style.display = "block";
  }
}
checkuser();


logoutButton.addEventListener("click",()=>{
      localStorage.setItem("CURRENT_LOGGED_IN_USER","")
      checkuser()
})

async function logMovies() {
  const url = "https://ott-details.p.rapidapi.com/search?title=dilwale&page=1";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "742c2ccc64msh8accbf5133a1892p15c130jsn140eb97cf649",
      "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// addbutton.addEventListener("click", (e) => {
//   let newDiv = document.createElement("div");
//   let text = document.createTextNode("Hi , how are you");

//   newDiv.appendChild(text);
//   dashboard.appendChild(newDiv);
//   logMovies();
// });

function getCurrentUser() {
  return localStorage.getItem("CURRENT_LOGGED_IN_USER");
}

if (getusers() == null) {
  localStorage.setItem("users", JSON.stringify([]));
}
function getusers() {
  return JSON.parse(localStorage.getItem("users"));
}
function loginOrSignup(data) {
  let users = getusers(); // Array
  if (currentState == login) {
    let usermatched = false; // flag variable
    users.forEach((user) => {
      console.log(user.user, data.user);
      if (user.user == data.user) {
        usermatched = true;
        if (user.pass == data.pass) {
          console.log("password matched");
          localStorage.setItem("CURRENT_LOGGED_IN_USER", user.user);

          checkuser();
        } else {
          alert("Wrong pass");
        }
      }
    });
    if (!usermatched) {
      alert("User doesn't exist");
    }
  } else if (currentState == signup) {
    let usermatched = false;
    users.forEach((user) => {
      console.log(user.user, data.user);
      if (user.user == data.user) {
        usermatched = true;
        alert("User already exists");
      }
    });

    if (!usermatched) {
      let tempusers = [...users, data];
      localStorage.setItem("users", JSON.stringify(tempusers));

      currentState = login;
      toChangeFORMonState();
      username.value = "";
      pass.value = "";
    }
  }
}

let currentState = "";

const login = "LOGIN";
const signup = "SIGNUP";

moveback.addEventListener("click", () => {
  session.style.display = "none";
  LoginSingupButtonCon.style.display = "flex";
});

function toChangeFORMonState() {
  if (currentState == login) {
    formheading.innerHTML = "Login";
    loginsignupbtn.innerHTML = "Login";
  } else if (currentState == signup) {
    formheading.innerHTML = "Signup";
    loginsignupbtn.innerHTML = "Signup";
  }
}

function hideHomeflexFORM(state) {
  LoginSingupButtonCon.style.display = "none";
  currentState = state;
  toChangeFORMonState();
  session.style.display = "flex";
}

loginbtn.addEventListener("click", () => {
  hideHomeflexFORM(login);
});

signupbtn.addEventListener("click", () => {
  hideHomeflexFORM(signup);
});

function loginsignup() {}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(username.value);
  console.log(pass.value);

  loginOrSignup({
    user: username.value,
    pass: pass.value,
  });

  username.value = "";
  pass.value = "";
});
