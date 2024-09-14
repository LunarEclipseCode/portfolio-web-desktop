import React, { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faUnderline, faSuperscript, faSubscript, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify, faHeading, faIndent, faOutdent } from "@fortawesome/free-solid-svg-icons";
import { Extension } from "@tiptap/core";

const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: "20", // Set default font size to 20px
        parseHTML: (element) => ({
          fontSize: element.style.fontSize.replace("px", ""),
        }),
        renderHTML: (attributes) => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}px`,
          };
        },
      },
      fontFamily: {
        default: null,
        parseHTML: (element) => ({
          fontFamily: element.style.fontFamily,
        }),
        renderHTML: (attributes) => {
          if (!attributes.fontFamily) {
            return {};
          }
          return {
            style: `font-family: ${attributes.fontFamily}`,
          };
        },
      },
    };
  },
});

const Indent = Extension.create({
  name: "indent",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          indent: {
            default: 0,
            renderHTML: (attributes) => {
              if (!attributes.indent) {
                return {};
              }
              return {
                style: `margin-left: ${attributes.indent * 2}em;`,
              };
            },
            parseHTML: (element) => ({
              indent: parseInt(element.style.marginLeft) / 2 || 0,
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      increaseIndent:
        () =>
        ({ state, dispatch }) => {
          const { selection } = state;
          const { $from, $to } = selection;
          state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (node.type.name === "paragraph" || node.type.name === "heading") {
              const indent = (node.attrs.indent || 0) + 1;
              dispatch(state.tr.setNodeMarkup(pos, null, { ...node.attrs, indent }));
            }
          });
          return true;
        },
      decreaseIndent:
        () =>
        ({ state, dispatch }) => {
          const { selection } = state;
          const { $from, $to } = selection;
          state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (node.type.name === "paragraph" || node.type.name === "heading") {
              const indent = Math.max((node.attrs.indent || 0) - 1, 0);
              dispatch(state.tr.setNodeMarkup(pos, null, { ...node.attrs, indent }));
            }
          });
          return true;
        },
    };
  },
});

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      FontSize,
      Indent,
    ],
    content: "<p>Hello World!</p>",
  });

  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("20");
  const [firstIndentClick, setFirstIndentClick] = useState(true);

  const handleFontFamilyChange = (event) => {
    const family = event.target.value;
    setFontFamily(family);
    editor.chain().focus().setMark("textStyle", { fontFamily: family }).run();
  };

  const handleFontSizeChange = (event) => {
    const size = event.target.value;
    setFontSize(size);
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
  };

  const applyHeadingStyle = (level) => {
    const headingStyles = {
      1: { fontSize: "2em", margin: ".67em 0" },
      2: { fontSize: "1.5em", margin: ".75em 0" },
      3: { fontSize: "1.17em", margin: ".83em 0" },
    };

    const isBold = editor.isActive("bold");
    const isItalic = editor.isActive("italic");
    const isUnderline = editor.isActive("underline");
    const currentFontFamily = editor.getAttributes("textStyle").fontFamily || fontFamily;
    const currentFontSize = editor.getAttributes("textStyle").fontSize || fontSize;
    const isLeftAligned = editor.isActive({ textAlign: "left" });
    const isCenterAligned = editor.isActive({ textAlign: "center" });
    const isRightAligned = editor.isActive({ textAlign: "right" });
    const isJustifyAligned = editor.isActive({ textAlign: "justify" });

    const newFontSize = headingStyles[level].fontSize;

    const { from, to, $from } = editor.state.selection;
    const lineStart = $from.start();
    const lineEnd = $from.end();

    editor.chain().focus().toggleHeading({ level }).run();

    editor.view.state.doc.nodesBetween(lineStart, lineEnd, (node, pos) => {
      if (node.type.name === "text") {
        const tr = editor.state.tr;
        const marks = node.marks.filter((mark) => mark.type.name === "textStyle");

        marks.forEach((mark) => {
          const newAttrs = { ...mark.attrs };
          if (editor.isActive("heading", { level })) {
            newAttrs.fontSize = newFontSize;
            newAttrs.margin = headingStyles[level].margin;
          } else {
            newAttrs.fontSize = mark.attrs.fontSize || fontSize;
            delete newAttrs.margin;
          }
          tr.removeMark(pos, pos + node.nodeSize, mark);
          tr.addMark(pos, pos + node.nodeSize, mark.type.create(newAttrs));
        });

        editor.view.dispatch(tr);
      }
    });

    if (isBold) {
      editor.chain().focus().setMark("bold").run();
    }
    if (isItalic) {
      editor.chain().focus().setMark("italic").run();
    }
    if (isUnderline) {
      editor.chain().focus().setMark("underline").run();
    }
    if (currentFontFamily) {
      editor.chain().focus().setMark("textStyle", { fontFamily: currentFontFamily }).run();
    }
    if (currentFontSize) {
      editor.chain().focus().setMark("textStyle", { fontSize: currentFontSize }).run();
    }

    if (isLeftAligned) {
      editor.chain().focus().setTextAlign("left").run();
    } else if (isCenterAligned) {
      editor.chain().focus().setTextAlign("center").run();
    } else if (isRightAligned) {
      editor.chain().focus().setTextAlign("right").run();
    } else if (isJustifyAligned) {
      editor.chain().focus().setTextAlign("justify").run();
    }
  };

  const toggleHeading = (level) => {
    applyHeadingStyle(level);
  };

  const toggleSuperscript = () => {
    if (editor.isActive("subscript")) {
      editor.chain().focus().unsetSubscript().run();
    }
    editor.chain().focus().toggleSuperscript().run();
  };

  const toggleSubscript = () => {
    if (editor.isActive("superscript")) {
      editor.chain().focus().unsetSuperscript().run();
    }
    editor.chain().focus().toggleSubscript().run();
  };

  const handleIndent = () => {
    if (firstIndentClick) {
      editor.chain().focus().decreaseIndent().increaseIndent().run();
      setFirstIndentClick(false);
    } else {
      editor.chain().focus().increaseIndent().run();
    }
  };

  useEffect(() => {
    if (!editor) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        const { from, to } = editor.state.selection;
        const currentFontSize = editor.getAttributes("textStyle").fontSize || fontSize;

        setTimeout(() => {
          editor.chain().focus().setMark("textStyle", { fontSize: currentFontSize }).run();
        }, 0);
      }
    };

    editor.view.dom.addEventListener("keydown", handleKeyDown);
    return () => {
      editor.view.dom.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor, fontSize]);

  const renderToolbar = () => {
    if (!editor) {
      return null;
    }
    return (
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button onClick={() => toggleSuperscript()} className={editor.isActive("superscript") ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faSuperscript} />
        </button>
        <button onClick={() => toggleSubscript()} className={editor.isActive("subscript") ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faSubscript} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={editor.isActive({ textAlign: "left" }) ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={editor.isActive({ textAlign: "center" }) ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={editor.isActive({ textAlign: "right" }) ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("justify").run()} className={editor.isActive({ textAlign: "justify" }) ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faAlignJustify} />
        </button>
        <button onClick={() => toggleHeading(1)} className={editor.isActive("heading", { level: 1 }) ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faHeading} />1
        </button>
        <button onClick={() => toggleHeading(2)} className={editor.isActive("heading", { level: 2 }) ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faHeading} />2
        </button>
        <button onClick={() => toggleHeading(3)} className={editor.isActive("heading", { level: 3 }) ? "editor-button is-active" : "editor-button"}>
          <FontAwesomeIcon icon={faHeading} />3
        </button>
        <button onClick={handleIndent} className="editor-button">
          <FontAwesomeIcon icon={faIndent} />
        </button>
        <button onClick={() => editor.chain().focus().decreaseIndent().run()} className="editor-button">
          <FontAwesomeIcon icon={faOutdent} />
        </button>
        <select value={fontFamily} onChange={handleFontFamilyChange} className="editor-select">
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <select value={fontSize} onChange={handleFontSizeChange} className="editor-select">
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
          <option value="24">24</option>
          <option value="28">28</option>
          <option value="32">32</option>
          <option value="36">36</option>
        </select>
      </div>
    );
  };

  return (
    <div className="editor-container">
      {renderToolbar()}
      <EditorContent editor={editor} className="editor-content" />
      <style>{`
        .editor-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          padding: 10px;
          background-color: #1e1e1e; /* Dark background color */
          color: #ffffff; /* Light text color */
        }

        .toolbar {
          display: flex;
          flex-wrap: wrap; /* Allow toolbar items to wrap */
          justify-content: flex-start;
          gap: 5px; /* Reduce gap between buttons */
          margin-bottom: 10px;
        }

        .editor-content {
          flex-grow: 1;
          background-color: #2e2e2e; /* Dark background for editor content */
          color: #ffffff; /* Light text color */
          border: 1px solid #444; /* Dark border */
          border-radius: 5px;
          padding: 10px;
          box-sizing: border-box;
          overflow: auto;
        }

        /* Remove focus outline and border */
        .ProseMirror:focus {
          outline: none;
          border: none;
        }

        /* Set the editor text color to white and background to dark */
        .ProseMirror {
          color: #ffffff;
          background-color: #2e2e2e;
          font-size: 20px; /* Set default font size to 20px */
        }

        /* Define font sizes for headings */
        .ProseMirror h1 {
          font-size: 2em; /* Adjust size for H1 */
        }

        .ProseMirror h2 {
          font-size: 1.75em; /* Adjust size for H2 */
        }

        .ProseMirror h3 {
          font-size: 1.5em; /* Adjust size for H3 */
        }

        .editor-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          color: #ffffff; /* Light text color */
          width: 30px; /* Square button */
          height: 30px; /* Square button */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .editor-button.is-active {
          background-color: #444; /* Active button background color */
          border-radius: 0.15em;
        }

        .editor-button:hover {
          border-radius: 0.15em;
        }

        .button:hover, .editor-button:hover {
          background-color: #555; /* Hover effect */
        }

        .editor-select {
          background: #2e2e2e; /* Dark background for select */
          color: #ffffff; /* Light text color */
          border: 1px solid #444; /* Dark border */
          border-radius: 5px;
          padding: 5px;
          margin-left: 5px; /* Reduce margin */
        }
      `}</style>
    </div>
  );
};

export default Editor;

export const displayEditor = () => {
  return <Editor />;
};
