let data = {};

const container = document.getElementById("container");
const enter_present = document.getElementById("present_button");

enter_present.addEventListener("click", () => {
  const name_p = document.getElementById("name_p").value;
  const pass_p = document.getElementById("pass_p").value;
  if (name_p == "" && pass_p == "") {
    let div = document.createElement("div");
    div.id = "emptyerr";
    div.innerHTML = "EMPTY FIELDS NOT ALLOWED";
    container.appendChild(div);
  } else {
    let details = {};
    const searchName = async () => {
      details.name = name_p;
      details.pass = pass_p;
      details.new = false;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };
      let response = await fetch("/new", options);
      let json = await response.json();
      let a = json.password_match;
      let b = json.account_present;
      let authtoken = json.token;

      function setCookie(cname, cvalue) {
        document.cookie = cname + "=" + cvalue + ";path = /user";
      }
      setCookie("token", authtoken);
      // return a;
      if (a == true && b == true) {
        let div = document.createElement("div");
        div.id = "success";
        div.innerHTML = "Account found";
        container.appendChild(div);
        window.setTimeout(() => {
          document.getElementById("success").style.display = "none";
        }, 5000);
        var url = new URL("http://localhost:3000/user/noteIt/");
        window.location.replace(url);
      }
      if (b == false) {
        let div = document.createElement("div");
        div.id = "fail";
        window.location.replace("/user/createacc");
        div.innerHTML = "Account not found create one!";
        container.appendChild(div);
        window.setTimeout(() => {
          document.getElementById("fail").style.display = "none";
        }, 5000);
      } else if (b == true && a == false) {
        let div = document.createElement("div");
        div.id = "fail";
        div.innerHTML = "password is incorrect";
        container.appendChild(div);
        window.setTimeout(() => {
          document.getElementById("fail").style.display = "none";
        }, 5000);
      }
    };
    searchName();
  }
});
