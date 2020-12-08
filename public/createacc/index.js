let data = {};

const container = document.getElementById("container");
const enter_absent = document.getElementById("absent_button");
enter_absent.style.display = "none";
const check = document.getElementById("check");

check.addEventListener("click", () => {
  const name_a = document.getElementById("name_a").value;
  const pass_a = document.getElementById("pass_a").value;
  const conpass_a = document.getElementById("conpass_a").value;
  if (name_a == "" && pass_a == "" && conpass_a == "") {
    let div = document.createElement("div");
    div.id = "emptyerr";
    div.innerHTML = "EMPTY FIELDS NOT ALLOWED";
    container.appendChild(div);
    window.setTimeout(() => {
      document.getElementById("emptyerr").style.display = "none";
    }, 5000);
  } else {
    let data = {};
    if (pass_a == conpass_a) {
      const searchName = async () => {
        data.name = name_a;
        data.pass = pass_a;
        data.new = true;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        let response = await fetch("/new", options);
        let json = await response.json();
        let a = json.availibility;
        // return a;
        if (a == true) {
          check.style.display = "none";
          let div = document.createElement("div");
          div.id = "success";
          div.innerHTML = "Username available";
          container.appendChild(div);
          enter_absent.style.display = "block";
          enter_absent.addEventListener("click", () => {
            window.location.replace("/user/login");
          });
        } else if (a == false) {
          let div = document.createElement("div");
          div.id = "unavail";
          div.innerHTML = "username unavailable";
          container.appendChild(div);
          window.setTimeout(() => {
            document.getElementById("unavail").style.display = "none";
          }, 5000);
        }
      };
      searchName();
    } else {
      let div = document.createElement("div");
      div.id = "passerr";
      div.innerHTML = "Passwords don't match";
      container.appendChild(div);
      window.setTimeout(() => {
        document.getElementById("passerr").style.display = "none";
      }, 5000);
    }
  }
});
