import React, { Component } from "react";

export class ImageEditor extends Component {
  constructor() {
    super();
    this.state = {
      editorVisible: false,
      FilerobotImageEditor: null,
    };
  }

  componentDidMount() {
    this.injectCustomStyles(); // Inject the custom CSS
    this.openEditor();
  }

  injectCustomStyles = () => {
    setTimeout(() => {
      const style = document.createElement("style");
      style.innerHTML = `
                .bugpIr { box-shadow: 0 2px 4px #202020 !important }
                .iKiSEY { background-color: #111111 !important}
                .imWTvl { background-color: #111111 !important}
                .eoKvuf { background: #161616 !important;}
                .bwmHId { padding: 0px 2px !important;}
                .window-y-border { width: 100% !important;}
                .dYTMGn { background: #111111 !important}
                .FIE_carousel-next-button { background: #161616 !important; }
                .FIE_carousel-prev-button { background: #161616 !important; }
            `;
      document.head.appendChild(style);
    }, 0); // Delay the injection by 0ms (next tick)
  };

  openEditor = async () => {
    if (!this.state.FilerobotImageEditor) {
      const FilerobotImageEditor = (await import("filerobot-image-editor")).default;
      this.setState({ FilerobotImageEditor });
    }

    this.setState({ editorVisible: true }, () => {
      const { TABS, TOOLS } = this.state.FilerobotImageEditor;
      const config = {
        source: "https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg",
        onSave: (editedImageObject, designState) => {
          console.log("Image saved", editedImageObject, designState);

          // Create an anchor element to trigger the download
          const link = document.createElement("a");
          link.href = editedImageObject.imageBase64;
          link.download = "edited-image.jpg";

          link.click();
        },

        annotationsCommon: {
          fill: "#ff0000",
        },
        Text: { text: "Filerobot..." },
        Rotate: { angle: 90, componentType: "slider" },
        tabsIds: [
          TABS.FINETUNE,
          TABS.ADJUST,
          TABS.FILTERS,
          TABS.RESIZE,
          // TABS.ANNOTATE,
        ],
        defaultTabId: TABS.FINETUNE,
        disableZooming: true,
        theme: {
          palette: {
            "bg-hover": "#161616", // color of the background behind image, also color of background color of text in dropdown when hovered over or selected in Add Watermark button
            "bg-primary-active": "#070707", // color of button when hovered over and selected
            "bg-active": "#161616", // color of background color of text in dropdown when hovered over or selected
            "bg-stateless": "#161616", // color of buttons in left sidebar when not hovered or selected
            "bg-secondary": "#111111", // color of main ui
            "accent-primary": "#a9b6c2", // color of the border when clicked on 'Adjust'
            "accent-primary-active": "#a9b6c2", // color of selected icon and text in sidebar
            "icons-primary": "#a9b6c2", // color of icons when not hovered or selected
            "borders-secondary": "#a9b6c2", // color of the top border the separates editor and the save, undo top bar
            // 'txt-secondary' : '#ff0000' ,                     // text color in dialog box of Save button
            // 'light-shadow' : '#ff0000',
            "txt-primary": "#a9b6c2",
          },
        },
      };

      this.editorInstance = new this.state.FilerobotImageEditor(document.querySelector("#editor_container"), config);

      this.editorInstance.render({
        onClose: (closingReason) => {
          console.log("Closing reason", closingReason);
          this.setState({ editorVisible: false });
          this.editorInstance.terminate();
        },
      });
    });
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          id="editor_container"
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {this.state.editorVisible && (
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "1.25rem",
                color: "#ccc",
                padding: "1rem",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              Loading Image Editor...
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ImageEditor;

export const displayImageEditor = () => {
  return <ImageEditor />;
};
