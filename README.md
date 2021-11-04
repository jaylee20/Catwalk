# Catwalk

---

## Project Description:

Project Catwalk is a system design project, where a database and server(s) will be implemented to meet the system requirements of a refreshed modern retail web-portal. The back end system will then be deployed and scaled to support production level traffic (with a minimum) of 1,000 requests per second on one or multiple Amazon Web Services EC2 t2.micro instance with 200 millisecond average response time (or better) and zero error rate.

<p></p>

---

## Project Tech Stack:

- **Front-End:** JavaScript, React, Styled Components
- **Back-End:** Node.js, Express, PostgreSQL, Redis Cache, Nginx, Docker
- **Testing:** Jest, React Testing Library, Cypress, CircleCI, K6, LoaderIO, NewRelic

---

## How To Use This Repository:

1. **Instructions:**

   1. Fork and clone repository to your local machine.
   2. Open the project and open the terminal.
   3. Create and place an API Key (Follow the API Key Information steps below).
   4. Run `npm install` in the terminal. More information on [NPM](https://www.npmjs.com/)
   5. Run `npm run server` in the terminal. This will start the server.
   6. Run `npm run transpile` in the terminal. This will bundle all client side files.
   7. Open http://localhost:3000 in a browser to view **Project Catwalks** website!
   <p></p>

2. **API Key Information**

   1. Copy the config.example.js in the config folder.
   2. Rename config.example.js to config.js.
   3. Replace 'GITHUBKEY' with your personal access token.
   4. Replace 'USER' with your PostgreSQL username.
   5. Replace 'PASSWORD' with your PostgreSQL password.
   <p></p>

---

## Links To Other README's Within This Repository:

1.  **API Documentation - Product Information:**

    - **Purpose:**
      - This README documents and describes the Product Information API endpoint that is used by the client-side web application.
    - **Link:**
      - [Product Information README](https://github.com/jaylee20/Catwalk/blob/main/server/README.md)
      <p></p>

---

## Further Learning:

1. **How to install npm on your own on VSCode:**

   1. Run `npm init` in terminal and enter in the walkthrough info as desired (optional). This creates your package.json file.
   2. Run `npm install` in the terminal. This will create your package-lock.json file.
   <p></p>

2. **How to install webpack on your own:**
   1. Run `npm install --save-dev webpack` to download webpack locally.
   2. Run `npm install --save-dev webpack-cli` if you want to run webpack from the terminal (recommended).
   3. Make a new file named `webpack.config.js`. This will be used to tell webpack where to look for its input and where to output the bundled file.
   4. Add your configuration info into `webpack.config.js`. Make sure that your `entry` and `output` paths match your folder set up. You can name the files whatever you like, however it's standard to name the main(exports the folder content) file `index.js`.
      > Note: If your output path file cannot be found(could be the wrong path), webpack will make the file for you!
      - Example:
        ```
        module.exports = {
          entry: './client/src/index.js',
          output: {
            filename: 'bundle.js',
            path: __dirname + '/client/public',
          },
        };
        ```
   5. Copy `"react-dev": "webpack --config webpack.config.js --mode=development -w"` into your package.json `"scripts"` object (you can switch out the command name `react-dev` to whatever you like). This will be your terminal command to run webpack. The `mode` can be set to:
      - `Development:` Makes your output file easier to read if you want to trace a bug
      - `Production:` The default if you don't specify, saves space.
      - Example:
        ```
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "react-dev": "webpack --config webpack.config.js --mode=development -w"
          },
        ```
   6. Run `npm run react-dev`(or whatever you chose to name the command in 5.) in its own terminal. Webpack will automatically re-build the output/browser-using file for you whenever you make a change to your client-side `index.js`-touching code(thanks to the `-w`).

---
