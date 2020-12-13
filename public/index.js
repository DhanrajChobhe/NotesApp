let data = {};

const yes = document.getElementById("yes");
const no = document.getElementById("no");

yes.addEventListener("click", () => {
  window.location.replace("/user/login/");
});

no.addEventListener("click", () => {
  window.location.replace("/user/createacc/");
});
