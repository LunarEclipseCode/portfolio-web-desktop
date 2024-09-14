import React, { Component } from "react";

export class AboutRaj extends Component {
  constructor(props) {
    super(props);
    this.screens = {};
    this.state = {
      screen: () => {},
      active_screen: this.props.default,
      navbar: false,
    };
  }

  componentDidMount() {
    this.screens = {
      about: <About />,
      education: <Education />,
      skills: <Skills />,
      projects: <Projects />,
      // "talks": <Talks />,
      resume: <Resume />,
    };
    this.changeScreen(document.getElementById(this.state.active_screen));
  }

  changeScreen = (e) => {
    const screen = e.id || e.target.id;

    this.setState({
      screen: this.screens[screen],
      active_screen: screen,
    });
  };

  showNavBar = () => {
    this.setState({ navbar: !this.state.navbar });
  };

  renderNavLinks = () => {
    return (
      <>
        <div
          id="about"
          tabIndex="0"
          onFocus={this.changeScreen}
          className={
            (this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") +
            " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-0 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
          }
        >
          <img className=" w-3 md:w-4" alt="about raj" src="./themes/Yaru/status/about.svg" />
          <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
        </div>
        <div
          id="education"
          tabIndex="0"
          onFocus={this.changeScreen}
          className={
            (this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") +
            " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-0 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
          }
        >
          <img className=" w-3 md:w-4" alt="raj's education" src="./themes/Yaru/status/education.svg" />
          <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
        </div>
        <div
          id="skills"
          tabIndex="0"
          onFocus={this.changeScreen}
          className={
            (this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") +
            " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-0 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
          }
        >
          <img className=" w-3 md:w-4" alt="raj's skills" src="./themes/Yaru/status/skills.svg" />
          <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
        </div>
        <div
          id="projects"
          tabIndex="0"
          onFocus={this.changeScreen}
          className={
            (this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") +
            " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-0 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
          }
        >
          <img className=" w-3 md:w-4" alt="raj's projects" src="./themes/Yaru/status/projects.svg" />
          <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
        </div>
        {/* <div id="talks" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "talks" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-0 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="raj's talks" src="./themes/Yaru/status/audio-headphones-symbolic.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Talks</span>
                </div> */}
        <div
          id="resume"
          tabIndex="0"
          onFocus={this.changeScreen}
          className={
            (this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") +
            " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-0 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
          }
        >
          <img className=" w-3 md:w-4" alt="raj's resume" src="./themes/Yaru/status/download.svg" />
          <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
        <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">{this.renderNavLinks()}</div>
        <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
          <div className=" w-3.5 border-t border-white"></div>
          <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
          <div className=" w-3.5 border-t border-white"></div>
          <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>{this.renderNavLinks()}</div>
        </div>
        <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">{this.state.screen}</div>
      </div>
    );
  }
}

export default AboutRaj;

export const displayAboutRaj = () => {
  return <AboutRaj default={"about"} />;
};

// export const displayTalks = () => {
//     return <AboutRaj default={"talks"}/>;
// }

function About() {
  return (
    <>
      <div className="w-20 md:w-28 my-8 rounded-full">
        <img className="w-full" src="./images/logos/favicon.png" alt="Raj's Logo" />
      </div>
      <div className="text-lg md:text-2xl text-center px-1">
        <div>
          My name is <span className="font-bold">Raj Datta</span>.
        </div>
        <div className="font-normal ml-1">
          I'm <span className="text-pink-600 font-bold">jack of all trades.</span>
        </div>
      </div>
      <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
        <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
        <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
      </div>
      <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
        {/* <li className=" list-pc">I'm a <span className=" font-medium">Senior Software Engineer</span> experienced in leading teams and mentoring other engineers!</li> */}
        <li className=" mt-3 list-building"> My main tech stack is Qiskit/Python, but I have experience in C, RISC-V Assembly, Java, CSS, and OCaml.</li>
        <li className=" mt-3 list-time"> I am currently developing multiple projects in Python and CSS, which will be released soon.</li>
      </ul>
    </>
  );
}
function Education() {
  return (
    <>
      <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
        Education
        <div className="absolute pt-px bg-white mt-px top-full w-full">
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
        </div>
      </div>
      <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
        <li className="list-disc">
          <div className=" text-lg md:text-xl text-left font-bold leading-tight">Cornell University</div>
          <div className=" text-sm md:text-base text-gray-400 mt-0.5">2020 - 2024</div>
          <div className=" text-sm md:text-base  text-gray-200  mt-0.5">Major: Engineering Physics and Computer Science</div>
          <div className=" text-sm md:text-base text-gray-200 mt-0.5">Minor: English</div>
        </li>
      </ul>
    </>
  );
}
function Skills() {
  return (
    <>
      <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
        Technical Skills
        <div className="absolute pt-px bg-white mt-px top-full w-full">
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
        </div>
      </div>
      <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list">
        <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">I've worked with a wide variety of programming languages & frameworks.</li>
        <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
          <div>
            {" "}
            My areas of expertise are <strong className="text-ubt-gedit-orange">Qiskit and Python!</strong>
          </div>
        </li>
        <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
          <div>Here are my most frequently used</div>
        </li>
      </ul>
      <div className="w-full md:w-10/12 flex mt-4">
        <div className=" text-sm text-center md:text-base w-1/2 font-bold">Languages & Tools</div>
        <div className=" text-sm text-center md:text-base w-1/2 font-bold">Frameworks & Libraries</div>
      </div>
      <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
        <div className="px-2 w-1/2">
          <div className="flex flex-wrap justify-center items-start w-full mt-2">
            <img className="m-1" src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="python" />
            <img className="m-1" src="https://img.shields.io/badge/Qiskit-%236929C4.svg?style=for-the-badge&logo=Qiskit&logoColor=white" alt="qiskit" />
            <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="java" className="m-1" />
          </div>
        </div>
        <div className="px-2 flex flex-wrap items-start w-1/2">
          <div className="flex flex-wrap justify-center items-start w-full mt-2">
            <img className=" m-1" src="https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white" alt="jupyter" />
            <img className="m-1" src="https://img.shields.io/badge/Hugo-black.svg?style=for-the-badge&logo=Hugo" alt="hugo" />
            <img className="m-1" src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="cloudflare" />
          </div>
        </div>
      </div>
    </>
  );
}

function Projects() {
  const project_list = [
    {
      name: "Survivor Library Downloader",
      date: "July 2023",
      link: "https://github.com/LunarEclipseCode/survivor-library-downloader",
      description: ["A download manager for the Survivor Library featuring multi-threaded web crawling, corrupted file detection, dark mode, and smart updates."],
      domains: ["Python"],
    },
  ];

  const tag_colors = {
    javascript: "yellow-300",
    firebase: "red-600",
    firestore: "red-500",
    "firebase auth": "red-400",
    "chrome-extension": "yellow-400",
    flutter: "blue-400",
    dart: "blue-500",
    "react-native": "purple-500",
    html5: "pink-600",
    sass: "pink-400",
    tensorflow: "yellow-600",
    django: "green-600",
    python: "green-200",
    "codeforces-api": "gray-300",
    tailwindcss: "blue-300",
    "next.js": "purple-600",
  };

  return (
    <>
      <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
        Projects
        <div className="absolute pt-px bg-white mt-px top-full w-full">
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
        </div>
      </div>

      {project_list.map((project, index) => {
        const projectNameFromLink = project.link.split("/");
        const projectName = projectNameFromLink[projectNameFromLink.length - 1];
        return (
          <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex justify-center items-center">
                  <div className=" text-base md:text-lg mr-2">{project.name}</div>
                  <iframe src={`https://ghbtns.com/github-btn.html?user=LunarEclipseCode&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase() + "-star"}></iframe>
                </div>
                <div className="text-gray-300 font-light text-sm">{project.date}</div>
              </div>
              <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                {project.description.map((desc, index) => {
                  return (
                    <li key={index} className="list-disc mt-1 text-gray-100">
                      {desc}
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-wrap items-start justify-start text-xs py-2">
                {project.domains
                  ? project.domains.map((domain, index) => {
                      const borderColorClass = `border-${tag_colors[domain]}`;
                      const textColorClass = `text-${tag_colors[domain]}`;

                      return (
                        <span key={index} className={`px-1.5 py-0.5 w-max border ${borderColorClass} ${textColorClass} m-1 rounded-full`}>
                          {domain}
                        </span>
                      );
                    })
                  : null}
              </div>
            </div>
          </a>
        );
      })}
    </>
  );
}
function Resume() {
  return <iframe className="h-full w-full" src="./files/resume.pdf" title="Raj Datta resume" frameBorder="0"></iframe>;
}

// function Talks() {
//     return (
//         <>
//             <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list">
//                 <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
//                     <a href="https://">Functional Kotlin</a>
//                 </li>
//                 <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
//                     <a href="https://">The migration handbook</a>
//                 </li>
//             </ul>
//         </>
//     )
// }
