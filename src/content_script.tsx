import { makeLogger } from "ts-loader/dist/logger";

console.log("content_script inject");

const get_QA_list = (): NodeListOf<Element> => {
  const qa_list_class = ".w-full.border-b";
  return document.querySelectorAll(qa_list_class);
};

const gen_canvas_image = () => {
  const canvas = document.createElement("canvas");
  canvas.style.width = "300px";
  canvas.style.height = "300px";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.flexDirection = "column";


  get_QA_list().forEach((el: Element) => {
    wrapper.appendChild(el);
  });
  const el = document.querySelector("#__next main");
  if (el) wrapper.appendChild(el);

  console.log(ctx);
  if (ctx) {
    //      @ts-ignorevar div = document.getElementById('myDiv');
//      var canvas = document.getElementById('myCanvas');
//
//      // 获取 Canvas 上下文
//      var ctx = canvas.getContext('2d');
//
//      // 将 HTML 元素绘制到 Canvas 上下文中
//      ctx.drawImage(div, 0, 0);
//    ctx.drawImage(wrapper, 0, 0);
    let data = `
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">
       ${wrapper.innerHTML}
      </div>
    </foreignObject>
  </svg>
`;

    console.log(data)
    let DOMURL = window.URL || window.webkitURL || window;

    let img = new Image();
    let svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    let url = DOMURL.createObjectURL(svg);

    img.style.width = "2000px"
    img.style.height = "2000px"

    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url); // 摧毁刚刚生产的url
    };

    img.src = url;

    document.body.append(img)
  }
};


gen_canvas_image();