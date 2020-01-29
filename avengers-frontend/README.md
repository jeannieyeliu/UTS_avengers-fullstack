This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Week 7 Preparation

### Instruction:

### `npm install`

If this step failed, in particular, if you saw `npm WARN Local package.json exists...`

Remove package-lock.json, and perform `npm install` again

### `npm start`

If this is the only application you are running, the application will run at `localhost:3000`

### Key Principles of Code Style & Design:

1. Provide references used for the particular files. It should be located right under the importing modules;

2. Strong usability means that other developers find the code easy to read and understand. Therefore, providing valid and insightful comments is necessary. For example, instead of providing descriptions of the function, provide the reasoning of invoking this function;

3. Nice and consistent formatting is essential, such as implementing camelCase naming convention, and consistent indention;

4. Whenever promise is used, try to replace with async/await;

5. Frontend should only provide simple logic for UI, a clear division of, at least, MVC, is requested;

6. Single reponsibility for each function is the most important aspect, this ensures scalability and maintainability;

7. Each function should perform a quick unit testing;

8. Consistent git commit messages, use present tense, with capital letter to start with;

9. Business logic and database are implemented at backend, UI and user interactions and control are implemented at frontend;

10. don’t put sample code as comments when you are trying to push to remote, you might as well keep your sample code somewhere else

11. don’t push your test code to remote, it’s going to make merge hard

12. if your have changed other person’s work for your test purpose, remember to restore it back before you commit it

13. each component should be in a directory in which it includes your css file, your component file,and your test file if having.

14. don’t put styles in your component file, we should separate them from each other, reference to principle NO. 13.

15. each member should know how to merge their code to master and solve conflict

16. don't hard code your variable such as URL, it's going to make thing hard to maintain

# build the project using docker:
1. build the image:
$ docker image build -t avengers-frontend .
2. run the container:
$ docker container run -p 3000:3000 avengers-frontend
3. run in docker bin/bash:
npm start

