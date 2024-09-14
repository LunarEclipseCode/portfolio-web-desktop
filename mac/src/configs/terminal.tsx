import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi, I am Raj. My main tech stack is Qiskit/Python, but I have experience in
              C, RISC-V Assembly, Java, CSS, and OCaml..
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content: "Quantum Computing, Computational Biology, Web Scraping"
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto: eobkqf09@anonaddy.me"
                target="_blank"
                rel="noreferrer"
              >
                eobkqf09@anonaddy.me
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/LunarEclipseCode"
                target="_blank"
                rel="noreferrer"
              >
                @LunarEclipseCode
              </a>
            </li>
            <li>
              Personal Website:{" "}
              <a
                className="text-blue-300"
                href="https://raj-datta.com"
                target="_blank"
                rel="noreferrer"
              >
                https://raj-datta.com
              </a>
            </li>
          </ul>
        )
      }
    ]
  }
];

export default terminal;
