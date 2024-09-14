# Portfolio Web Desktop

This project features interactive web desktops for MacOS, Windows, and Ubuntu, each equipped with a suite of applications and UI elements designed to provide an engaging user experience across both desktop and mobile devices. 

## Features

- **Mobile Support**: All UI elements and applications are fully responsive and optimized for mobile devices.

- **MacOS Light and Dark Modes**: The MacOS version offers both light and dark themes, which can be easily toggled via the control panel.

- **Markdown Editor (Quill)**:  Powered by [Tiptap](https://tiptap.dev/), Quill allows user to write using Markdown syntax. Although features like strikethough text and others are not directly available in the conrol bar of Quill, they are rendered properly when typed manually. 

- **Chess Game:** Incorporates UI from [react-chessboard](https://github.com/Clariity/react-chessboard) and game logic from [chess.js](https://github.com/jhlywa/chess.js). The player vs. bot mode is powered by [stockfish.js](https://github.com/nmrugg/stockfish.js).

- **ChatGPT**: Use gpt-4o-mini with proper rendering of tables, equations, and code blocks. Equations are rendered using [remark-math](https://github.com/remarkjs/remark-math). Users have the option to copy just the code or the entire response, and can retry prompts as needed. Code blocks are syntax-highlighted using [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter). Other Markdown syntax, such as bold and italic text are also rendered properly.

- **Chrome**: The built-in browser supports multiple tabs and a vertical dropdown menu to switch between them, enhancing usability on mobile devices. It also includes navigation features like forward, backward, and homepage buttons, as well as a sidebar that lists popular websites that allow embedding.

- **Music Player**: Utilizing the Deezer API, the music player fetches 30-second previews of songs. Users can play, pause, skip tracks, loop songs, shuffle playlists, adjust the volume, and drag the progress slider to seek within a track.

- **Contact Form**: To prevent spam, the contact form includes 2FA. Once your email is verified, you won't need to verify it again unless you clear your browser cache or use a different browser. The 2FA code is sent to your email and stays valid for one minute. Email service is powered by [EmailJS](https://www.emailjs.com/).

- **Battery Status Display**: In the Linux and Ubuntu versions, the control center displays your actual battery percentage and battery life.

- **Image Editor**: Perform basic image editing tasks such as resizing, cropping, rotating, and flipping. Adjust brightness, contrast, blur, and other image attributes are also supported. Edited images can be saved directly to your device. The image editor is powered by [filerobot-image-editor](https://github.com/scaleflex/filerobot-image-editor).

- **DevToys**: Although DevToys was originally developed to be just another app for the website, I later decided to keep adding more features to it and make it a separate website.

- Draggable Icons allow reordering of apps in sidebar (for Ubuntu) or for the taskbar in Windows.

## Site Configuration

The portfolio website is comprised of four distinct websites seamlessly integrated together: the homepage and the three web desktops. Each is hosted in its own repository, totaling four repositories. While it's theoretically possible to deploy all components from a single repository, I have opted to keep them separate for better modularity and easier management.

To avoid the inconvenience of sharing four different repos, I have made the individual repositories private and set up GitHub Actions so that any changes pushed to those repositories automatically update this **portfolio-web-desktop** repo. Consequently, most updates to this repository will be from GitHub Actions, while my manual commits will primarily involve README updates.

## Credits

- **Ubuntu and Windows**: Based on [Vivek Patel's Portfolio](https://vivek9patel.github.io/) ([GitHub Repo](https://github.com/vivek9patel/vivek9patel.github.io)).

- **MacOS Version**: Forked from [playground-macos](https://github.com/Renovamen/playground-macos).

- **Homepage Assets**: Sourced from [this YouTube video](https://youtu.be/qwtWcGeIe40?si=WtWfYR5asxfNWIYM).

- **Inspiration**: Many ideas and inspirations were drawn from [daedalOS](https://dustinbrett.com/).