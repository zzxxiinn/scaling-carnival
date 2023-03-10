import React, {
  ComponentProps,
  CSSProperties,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";

let domToImg = (function () {
  // 转png需要的canvas对象及其上下文
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d")!;

  // canvas绘制图片元素方法
  let draw = function (img: any) {
    let width = img.width,
      height = img.height;
    // canvas绘制
    canvas.width = width;
    canvas.height = height;
    // 画布清除
    context.clearRect(0, 0, width, height);
    // 绘制图片到canvas
    context.drawImage(img, 0, 0);
  };

  // canvas画布绘制的原图片
  let img = new Image();
  // 回调
  let callback = function () {};

  // 图片回调
  img.onload = function () {
    draw(this);
    // 回调方法
    callback();
  };

  let exports = {
    dom: null,
    // DOM变成svg，并作为图片显示
    dom2Svg: function () {
      let dom = this.dom as Element | null;
      if (!dom) {
        return this;
      }

      // 复制DOM节点
      let cloneDom = dom.cloneNode(true) as Element;
      cloneDom.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      cloneDom.classList.remove("outline");

      // 如果有图片，变成base64
      let imgDom = null;
      if (cloneDom.tagName.toLowerCase() == "img") {
        imgDom = cloneDom;
      } else {
        // 这里就假设一个图片，多图自己遍历转换下就好了
        imgDom = cloneDom.querySelector("img");
      }

      if (imgDom) {
        draw(imgDom);
        // @ts-ignore
        imgDom.src = canvas.toDataURL();
      }

      let htmlSvg =
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="' +
        // @ts-ignore
        dom.offsetWidth +
        '" height="' +
        // @ts-ignore
        dom.offsetHeight +
        '"><foreignObject x="0" y="0" width="100%" height="100%">' +
        new XMLSerializer().serializeToString(cloneDom) +
        document.querySelector("style")!.outerHTML +
        "</foreignObject></svg>";

      htmlSvg = htmlSvg
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/#/g, "%23");

      // 图片地址显示为DOM转换的svg
      img.src = htmlSvg;

      return this;
    },
    // 作为图片下载，JS前端下载可参考这篇文章：
    // JS前端创建html或json文件并浏览器导出下载 - http://www.zhangxinxu.com/wordpress/?p=6252
    download: function () {
      // 创建隐藏的可下载链接
      let eleLink = document.createElement("a");
      // 下载图片文件名就按照时间戳来
      eleLink.download = "zxx_png-" + (+new Date() + "").slice(1, 9) + ".png";
      eleLink.style.display = "none";

      // 触发图片onload是个异步过程，因此，需要在回调中处理
      callback = function () {
        eleLink.href = canvas.toDataURL();
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      };

      // dom变图片
      this.dom2Svg();
    },
  };

  return exports;
})();

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

function getQAContents() {
  const QA_LIST_SELECTOR = "#__next main .w-full.border-b";

  const qa_list = document.querySelectorAll(QA_LIST_SELECTOR);
  const content_wrapper = document.createElement("div");

  qa_list.forEach((el) => {
    const cloned = el.cloneNode(true) as HTMLElement;
    cloned.style.padding = "0 20px";
    cloned.style.color = "rgba(208,208,208,0.8)";
    cloned.classList.forEach((c) => {
      // distinguish between q and a
      if (c === "bg-gray-50") {
        cloned.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      }

      const regex = /^dark:|^bg-|^text-/;
      if (regex.test(c)) cloned.classList.remove(c);
    });

    // remove vote
    cloned
      .querySelectorAll(".flex.justify-between")
      .forEach((el) => el.remove());

    // remove prose class
    cloned
      .querySelectorAll(".prose")
      .forEach((el) => el.classList.remove("prose"));

    // remove all buttons
    cloned.querySelectorAll("button").forEach((el) => el.remove());

    // remove code whitespace-pre
    cloned.querySelectorAll("code").forEach((el) => {
      el.style.whiteSpace = "pre-wrap";
    });

    content_wrapper.append(cloned);
  });

  return content_wrapper;
}

const DownloadIcon = (props: ComponentProps<any>) => {
  const s: CSSProperties = {
    width: "20px",
    height: "20px",
    verticalAlign: "middle",
    fill: "currentColor",
    overflow: "hidden",
    color: "#e5e5e5",
    cursor: "pointer",
    position: "absolute",
    right: "1em",
    top: "110px",
  };
  return (
    <svg
      className="icon"
      style={s}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.handleClick}
    >
      <path d="M512 576l256-256h-192V64h-128v256H256z m232.736-104.736l-71.744 71.744L933.088 640l-421.056 157.024L90.976 640l260.064-96.992-71.744-71.744L0.032 576v256l512 192 512-192v-256z"></path>
    </svg>
  );
};

const CloseIcon = (props: ComponentProps<any>) => {
  const s: CSSProperties = {
    width: "20px",
    height: "20px",
    verticalAlign: "middle",
    fill: "currentColor",
    overflow: "hidden",
    color: "#e5e5e5",
    cursor: "pointer",
    position: "absolute",
    right: "1em",
    top: "80px",
  };
  return (
    <svg
      style={s}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.handleClick}
    >
      <path
        d="M828.770654 148.714771C641.293737-20.89959 354.184117-19.590868 168.245698 152.630946c-212.062907 196.418185-212.062907 522.329912 0 718.748098 185.93842 172.221815 473.048039 173.520546 660.524956 3.916176 219.435707-198.536117 219.435707-528.054322 0-726.580449z m-121.880976 569.643707c-11.708566 11.708566-30.680039 11.708566-42.388605 0L502.729054 556.586459c-0.659356-0.659356-1.728312-0.659356-2.397659 0L338.609327 718.318517c-11.708566 11.708566-30.680039 11.708566-42.388605 0l-0.039961-0.039961c-11.708566-11.708566-11.708566-30.680039 0-42.388605l161.732059-161.732058c0.659356-0.659356 0.659356-1.728312 0-2.397659L296.1408 350.008195c-11.708566-11.708566-11.708566-30.680039 0-42.388605l0.039961-0.039961c11.708566-11.708566 30.680039-11.708566 42.388605 0l161.772019 161.77202c0.659356 0.659356 1.728312 0.659356 2.397659 0L664.551024 307.539668c11.708566-11.708566 30.680039-11.708566 42.388605 0l0.039961 0.039961c11.708566 11.708566 11.708566 30.680039 0 42.388605L545.15762 511.770224c-0.659356 0.659356-0.659356 1.728312 0 2.397659L706.919649 675.939902c11.708566 11.708566 11.708566 30.680039 0 42.388605l-0.029971 0.029971z"
        fill={s.color}
      ></path>
    </svg>
  );
};

const Modal = (props: ComponentProps<any>) => {
  const MaskStyle: CSSProperties = {
    position: "fixed",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.6)",
    overflow: "hidden",
    padding: "5vh",
  };

  const ContainerStyle: CSSProperties = {
    height: "100vh",
    overflowY: "auto",
    padding: "60px",
    position: "relative",
  };

  const ModalContent: CSSProperties = {
    width: "768px",
    backgroundImage:
      "linear-gradient(140deg, rgb(207, 47, 152), rgb(106, 61, 236))",
    padding: "64px",
  };

  const FrameStyle: CSSProperties = {
    border: "none",
    boxShadow:
      "0 0 0 1px hsla(0,0%,100%,.3),0 0 0 1.5px rgba(0,0,0,.8),0 2.8px 2.2px rgba(0,0,0,.034),0 6.7px 5.3px rgba(0,0,0,.048),0 12.5px 10px rgba(0,0,0,.06),0 22.3px 17.9px rgba(0,0,0,.072),0 41.8px 33.4px rgba(0,0,0,.086),0 100px 80px rgba(0,0,0,.12)",
    display: "flex",
    minHeight: "120px",
    flexDirection: "column",
    alignItems: "stretch",
    paddingTop: "10px",
    borderRadius: "10px",
    background: "rgba(0,0,0,.75)",
    transition: "all .3s ease",
  };

  const ModalFooter: CSSProperties = {};

  const QAContent = getQAContents();

  const imageContentId = "__IMAGE";
  const handleDownload = () => {
    const imageRoot = document.getElementById(imageContentId);
    if (imageRoot) {
      // @ts-ignore
      domToImg.dom = imageRoot;
      domToImg.download();
    }

    // const imageRoot = document.getElementById(imageContentId);
    // if (imageRoot) {
    //   function filter(node: any) {
    //     return node.tagName !== "i";
    //   }
    //   domtoimage
    //     .toSvg(imageRoot, { filter: filter })
    //     .then(function (dataUrl) {
    //       console.log(dataUrl);
    //       const img = new Image();
    //       img.src = dataUrl;
    //       document.body.appendChild(img);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
    // if (imageRoot) {
    //   html2canvas(imageRoot).then((canvas) => {
    //     chrome.runtime.sendMessage(
    //       {
    //         msg_type: "download-image",
    //         data: canvas.toDataURL("image/png"),
    //       },
    //       (response) => {
    //         console.log("received user data", response);
    //       }
    //     );
    //   });
    // }
  };

  return (
    <div style={MaskStyle}>
      <div style={ContainerStyle}>
        <CloseIcon handleClick={props.handleClose} />
        <DownloadIcon handleClick={handleDownload} />

        <div style={ModalContent} id={imageContentId}>
          <div
            style={FrameStyle}
            dangerouslySetInnerHTML={{ __html: QAContent.innerHTML }}
          ></div>
        </div>

        <div style={ModalFooter}>
          <button>click!</button>
        </div>
      </div>
    </div>
  );
};

const RootContainer = () => {
  const [showModal, updateShowModal] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
  });

  const RootStyle: CSSProperties = {
    float: "right",
  };

  return (
    <div id="gen-image-modal" style={RootStyle}>
      <button onClick={() => updateShowModal(!showModal)}>click me!</button>

      {showModal && <Modal handleClose={() => updateShowModal(false)} />}
    </div>
  );
};

const root = createElement("div");
document.body.append(root);

ReactDOM.render(
  <React.StrictMode>
    <RootContainer />
  </React.StrictMode>,
  root
);
