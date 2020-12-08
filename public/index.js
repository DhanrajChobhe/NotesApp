let data = {};

// const notesDiv = document.getElementById("entered_notes");
// const container = document.getElementById("container");
// const add = document.getElementById("add");
// const get = document.getElementById("get");
// const enter_present = document.getElementById("present_button");
// const enter_absent = document.getElementById("absent_button");
// const check = document.getElementById("check");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
// const accinfo = document.getElementById("acc");
// const present = document.getElementById("present");
// const absent = document.getElementById("absent");
// const noteform = document.getElementById("nf");

// enter_present.addEventListener("click", () => {
//   const name_p = document.getElementById("name_p").value;
//   const pass_p = document.getElementById("pass_p").value;
//   if (name_p == "" && pass_p == "") {
//     let div = document.createElement("div");
//     div.id = "emptyerr";
//     div.innerHTML = "EMPTY FIELDS NOT ALLOWED";
//     container.appendChild(div);
//   } else {
//     let details = {};
//     const searchName = async () => {
//       details.name = name_p;
//       details.pass = pass_p;
//       details.new = false;
//       const options = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(details),
//       };
//       let response = await fetch("/new", options);
//       let json = await response.json();
//       let a = json.password_match;
//       let b = json.account_present;
//       // return a;
//       if (a == true && b == true) {
//         let div = document.createElement("div");
//         div.id = "success";
//         div.innerHTML = "Account found";
//         container.appendChild(div);
//         window.setTimeout(() => {
//           document.getElementById("success").style.display = "none";
//         }, 5000);
//         document.getElementById("nf").style.display = "block";
//         addFunction(name_p);
//         getFunction(name_p);
//         present.style.display = "none";
//       }
//       if (b == false) {
//         let div = document.createElement("div");
//         div.id = "fail";
//         present.style.display = "none";
//         absent.style.display = "block";
//         div.innerHTML = "Account not found create one!";
//         container.appendChild(div);
//         window.setTimeout(() => {
//           document.getElementById("fail").style.display = "none";
//         }, 5000);
//       } else if (b == true && a == false) {
//         let div = document.createElement("div");
//         div.id = "fail";
//         div.innerHTML = "password is incorrect";
//         container.appendChild(div);
//         window.setTimeout(() => {
//           document.getElementById("fail").style.display = "none";
//         }, 5000);
//       }
//     };
//     searchName();
//   }
// });

// check.addEventListener("click", () => {
//   const name_a = document.getElementById("name_a").value;
//   const pass_a = document.getElementById("pass_a").value;
//   const conpass_a = document.getElementById("conpass_a").value;
//   if (name_a == "" && pass_a == "" && conpass_a == "") {
//     let div = document.createElement("div");
//     div.id = "emptyerr";
//     div.innerHTML = "EMPTY FIELDS NOT ALLOWED";
//     container.appendChild(div);
//     window.setTimeout(() => {
//       document.getElementById("emptyerr").style.display = "none";
//     }, 5000);
//   } else {
//     let data = {};
//     if (pass_a == conpass_a) {
//       const searchName = async () => {
//         data.name = name_a;
//         data.pass = pass_a;
//         data.new = true;
//         const options = {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         };
//         let response = await fetch("/new", options);
//         let json = await response.json();
//         let a = json.availibility;
//         // return a;
//         if (a == true) {
//           check.style.display = "none";
//           let div = document.createElement("div");
//           div.id = "success";
//           div.innerHTML = "Username available";
//           container.appendChild(div);
//           enter_absent.style.display = "block";
//           enter_absent.addEventListener("click", () => {
//             absent.style.display = "none";
//             document.getElementById("success").style.display = "none";
//             present.style.display = "block";
//           });
//         } else if (a == false) {
//           let div = document.createElement("div");
//           div.id = "unavail";
//           div.innerHTML = "username unavailable";
//           container.appendChild(div);
//           window.setTimeout(() => {
//             document.getElementById("unavail").style.display = "none";
//           }, 5000);
//         }
//       };
//       searchName();
//     } else {
//       let div = document.createElement("div");
//       div.id = "passerr";
//       div.innerHTML = "Passwords don't match";
//       container.appendChild(div);
//       window.setTimeout(() => {
//         document.getElementById("passerr").style.display = "none";
//       }, 5000);
//     }
//   }
// });

yes.addEventListener("click", () => {
  window.location.replace("/user/login/");
});

no.addEventListener("click", () => {
  window.location.replace("/user/createacc/");
});

// function getFunction(name) {
//   get.addEventListener("click", async () => {
//     notesDiv.innerHTML = "";
//     data.name = name;
//     data.getPost = "get";
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     };
//     const res = await fetch("/io", options);
//     const received = await res.json();
//     const notes = received.notes;
//     const n = notes.length;
//     let Color = [
//       { text: "text-white", back: "bg-primary" },
//       { text: "text-white", back: "bg-secondary" },
//       { text: "text-white", back: "bg-success" },
//       { text: "text-white", back: "bg-danger" },
//       { text: "text-white", back: "bg-warning" },
//       { text: "text-white", back: "bg-info" },
//       { text: "text-white", back: "bg-dark" },
//     ];
//     let i;
//     for (i = 0; i < n; i++) {
//       let rnum = Math.floor(Math.random() * Math.floor(7));
//       noteCard(
//         name,
//         i,
//         "header" + i,
//         "note" + i,
//         "dateTime" + i,
//         notes[i].topic,
//         notes[i].note,
//         notes[i].date,
//         notes[i].time,
//         Color[rnum]
//       );
//     }
//   });
// }

// function addFunction(name) {
//   add.addEventListener("click", async () => {
//     const notes = document.getElementById("notes");
//     const topic = document.getElementById("topic");
//     data.topic = topic.value || "Note";
//     data.note = notes.value || "EMPTY";
//     data.name = name;
//     data.getPost = "post";
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     };
//     const response = await fetch("/io", options);
//     const json = await response.json();

//     topic.value = "";
//     notes.value = "";
//   });
// }

// async function remove(name, id, topic, note) {
//   const da = {};
//   da.remove = true;
//   da.name = name;
//   da.id = id;
//   da.topic = topic;
//   da.note = note;
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(da),
//   };
//   const res = await fetch("/remove", options);
//   const received = await res.json();
// }

// function noteCard(
//   name,
//   id,
//   head_id,
//   note_id,
//   dateTime_id,
//   topic,
//   noteText,
//   date,
//   time,
//   scheme
// ) {
//   let div = document.createElement("div");
//   div.classList.add(scheme.text);
//   div.classList.add(scheme.back);
//   div.classList.add("card");
//   div.classList.add("mb-3");
//   div.style.maxWidth = "18rem";
//   div.id = id;
//   let head = document.createElement("div");
//   head.classList.add("card-header");
//   head.id = head_id;
//   head.textContent = topic;
//   let span = document.createElement("span");
//   span.id = "remove";
//   span.className = id;
//   span.innerHTML = "&times;";
//   span.style.float = "right";
//   span.style.cursor = "pointer";
//   span.addEventListener("click", () => {
//     let id = span.className;
//     let item = document.getElementById(id);
//     let item2 = document.getElementById("header" + id);
//     let topic = item2.textContent.slice(0, -1);
//     let item3 = document.getElementById("note" + id);
//     let note = item3.textContent;

//     remove(name, id, topic, note);
//     item.parentNode.removeChild(item);
//   });
//   let cardBody = document.createElement("div");
//   cardBody.classList.add("card-body");
//   let dateTime = document.createElement("p");
//   dateTime.classList.add("card-title");
//   dateTime.id = dateTime_id;
//   dateTime.textContent = date + "\t\t\t" + time;
//   let text = document.createElement("p");
//   text.classList.add("card-text");
//   text.id = note_id;
//   text.textContent = noteText;

//   cardBody.appendChild(dateTime);
//   cardBody.appendChild(text);
//   div.appendChild(head);
//   head.appendChild(span);
//   div.appendChild(cardBody);
//   notesDiv.appendChild(div);
// }
