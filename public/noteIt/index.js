let data = {};

const notesDiv = document.getElementById("entered_notes");
const container = document.getElementById("container");
const add = document.getElementById("add");
const get = document.getElementById("get");
const noteform = document.getElementById("nf");

const current_url = new URL(window.location.href);

const name_p = current_url.searchParams.get("name");
getFunction(name_p);
addFunction(name_p);

function getFunction(name) {
  get.addEventListener("click", async () => {
    notesDiv.innerHTML = "";
    data.name = name;
    data.getPost = "get";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const res = await fetch("/io", options);
    const received = await res.json();
    const notes = received.notes;
    const n = notes.length;
    let Color = [
      { text: "text-white", back: "bg-primary" },
      { text: "text-white", back: "bg-secondary" },
      { text: "text-white", back: "bg-success" },
      { text: "text-white", back: "bg-danger" },
      { text: "text-white", back: "bg-warning" },
      { text: "text-white", back: "bg-info" },
      { text: "text-white", back: "bg-dark" },
    ];
    let i;
    for (i = 0; i < n; i++) {
      let rnum = Math.floor(Math.random() * Math.floor(7));
      noteCard(
        name,
        i,
        "header" + i,
        "note" + i,
        "dateTime" + i,
        notes[i].topic,
        notes[i].note,
        notes[i].date,
        notes[i].time,
        Color[rnum]
      );
    }
  });
}

function addFunction(name) {
  add.addEventListener("click", async () => {
    const notes = document.getElementById("notes");
    const topic = document.getElementById("topic");
    data.topic = topic.value || "Note";
    data.note = notes.value || "EMPTY";
    data.name = name;
    data.getPost = "post";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/io", options);
    const json = await response.json();

    topic.value = "";
    notes.value = "";
  });
}

async function remove(name, id, topic, note) {
  const da = {};
  da.remove = true;
  da.name = name;
  da.id = id;
  da.topic = topic;
  da.note = note;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(da),
  };
  const res = await fetch("/remove", options);
  const received = await res.json();
}

function noteCard(
  name,
  id,
  head_id,
  note_id,
  dateTime_id,
  topic,
  noteText,
  date,
  time,
  scheme
) {
  let div = document.createElement("div");
  div.classList.add(scheme.text);
  div.classList.add(scheme.back);
  div.classList.add("card");
  div.classList.add("mb-3");
  div.style.maxWidth = "18rem";
  div.id = id;
  let head = document.createElement("div");
  head.classList.add("card-header");
  head.id = head_id;
  head.textContent = topic;
  let span = document.createElement("span");
  span.id = "remove";
  span.className = id;
  span.innerHTML = "&times;";
  span.style.float = "right";
  span.style.cursor = "pointer";
  span.addEventListener("click", () => {
    let id = span.className;
    let item = document.getElementById(id);
    let item2 = document.getElementById("header" + id);
    let topic = item2.textContent.slice(0, -1);
    let item3 = document.getElementById("note" + id);
    let note = item3.textContent;

    remove(name, id, topic, note);
    item.parentNode.removeChild(item);
  });
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let dateTime = document.createElement("p");
  dateTime.classList.add("card-title");
  dateTime.id = dateTime_id;
  dateTime.textContent = date + "\t\t\t" + time;
  let text = document.createElement("p");
  text.classList.add("card-text");
  text.id = note_id;
  text.textContent = noteText;

  cardBody.appendChild(dateTime);
  cardBody.appendChild(text);
  div.appendChild(head);
  head.appendChild(span);
  div.appendChild(cardBody);
  notesDiv.appendChild(div);
}
