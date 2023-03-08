import html2canvas from "html2canvas";


const wrapper = document.createElement("div");
const gen_button = document.createElement("button");

wrapper.style.display = "flex";
wrapper.style.width = "1024px";
wrapper.style.fontSize = "12px";
wrapper.style.justifyContent = "flex-end";


function gen_canvas() {
  const qa_list = document.querySelectorAll("#__next main .w-full.border-b");
  const content_wrapper = document.createElement("div");
  qa_list.forEach(el => {
    content_wrapper.append(el.cloneNode(true));
  });

  document.body.append(content_wrapper);

  html2canvas(content_wrapper).then(function(canvas) {
    wrapper.appendChild(canvas);
  });
}

gen_button.innerText = "click me!";
gen_button.addEventListener("click", gen_canvas);
wrapper.append(gen_button);

document.body.append(wrapper);
