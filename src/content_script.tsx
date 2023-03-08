import html2canvas from "html2canvas";


function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  styles: Partial<CSSStyleDeclaration> = {}
) {
  const el = document.createElement(tag);
  const styleKeys = Object.keys(styles) as Array<keyof CSSStyleDeclaration>;

  for (const key of styleKeys) {
    // @ts-ignore
    el.style[key] = styles[key];
  }
  return el;
}

const el_button = createElement("button");
const el_wrapper = createElement("div", {
  display: "flex",
  justifyContent: "flex-end"
});

function gen_canvas() {
  const qa_list = document.querySelectorAll("#__next main .w-full.border-b");
  const el_content_wrapper = createElement("div", {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "1024px",
    fontSize: "12px"
  });

  qa_list.forEach(el => {
    const clonedEl = el.cloneNode(true) as Element;
    const voteEl = clonedEl.querySelector(".flex.justify-between");
    if (voteEl) {
      voteEl.remove();
    }

    el_content_wrapper.append(clonedEl);
  });

  document.body.append(el_content_wrapper);

  html2canvas(el_content_wrapper).then(function(canvas) {
    el_wrapper.appendChild(canvas);
  });
}

el_button.innerText = "click me!";
el_button.addEventListener("click", gen_canvas);
el_wrapper.append(el_button);

document.body.append(el_wrapper);
