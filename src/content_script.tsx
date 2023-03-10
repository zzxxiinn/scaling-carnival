import html2canvas from "html2canvas";

import React, {
  ComponentProps,
  CSSProperties,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";

function elementToImage(element: Element) {
  const rect = element.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  canvas.width = rect.width;
  canvas.height = rect.height;
  const ctx = canvas.getContext("2d");
  ctx!.drawImage(
    // @ts-ignore
    element,
    rect.left,
    rect.top,
    rect.width,
    rect.height,
    0,
    0,
    rect.width,
    rect.height
  );
}

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

function gen_canvas() {
  const qa_list = document.querySelectorAll("#__next main .w-full.border-b");
  const content_wrapper = document.createElement("div");
  qa_list.forEach((el) => {
    content_wrapper.append(el.cloneNode(true));
  });

  // document.body.append(content_wrapper);
  // html2canvas(content_wrapper).then(function(canvas) {
  //   wrapper.appendChild(canvas);
  // });
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

  const qa_list = document.querySelectorAll("#__next main .w-full.border-b");
  const content_wrapper = document.createElement("div");

  qa_list.forEach((el) => {
    const cloned = el.cloneNode(true) as HTMLElement;
    cloned.style.padding = "0 20px";
    cloned.style.color = "rgba(208,208,208,0.8)";
    cloned.classList.forEach((c) => {
      if (c === "bg-gray-50") {
        cloned.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      }

      if (
        c.startsWith("dark:") ||
        c.startsWith("bg-") ||
        c.startsWith("text-")
      ) {
        cloned.classList.remove(c);
      }
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

  const imageContentId = "__IMAGE";
  const handleDownload = () => {
    document.body.append(content_wrapper);
    html2canvas(content_wrapper).then(function (canvas) {
      chrome.downloads.download({
        url: canvas.toDataURL("image/png"),
        filename: "QA.png",
      });
    });
  };

  return (
    <div style={MaskStyle}>
      <div style={ContainerStyle}>
        <CloseIcon handleClick={props.handleClose} />
        <DownloadIcon handleClick={handleDownload} />

        <div style={ModalContent} id={imageContentId}>
          <div
            style={FrameStyle}
            dangerouslySetInnerHTML={{ __html: content_wrapper.innerHTML }}
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
