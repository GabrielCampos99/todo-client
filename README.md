# Welcome to TODO Client!

Hi, I'm making this app to train my skills with code. Try to code an entire app with simple and maintainable code.<br/>
Technologies that i'm using:<br/>
React<br/>
TypeScript<br/>
StyledComponents<br/>
Axios<br/>

# Instructions

To use this app, you must need: <br/>
Node (16x)<br/>
Yarn or NPM<br/>
And a device to run everthing 😁<br/>

First:<br/>
Run this script in app root folder : "yarn" to install all deps<br/>
Nice, if everything looks good, run "yarn dev" to run the app<br/>

**Resume**<br/>
1°: yarn<br/>
2°: yarn dev <br/>

**IMPORTANT: THIS CLIENT NEED A BACKEND SERVICE**
This is the backend: 
https://github.com/GabrielCampos99/todo-server



## Structure

```mermaid
graph LR
A[MAIN.TSX] -- Routes and authProvider --> C(Page)
A -- Routes and authProvider --> B(Page)
A -- Routes and authProvider --> D(Page)
C  --> E(Task)
E --> G((TaskCreate))
E --> H((TaskEdit))
E --> J((TaskList))
```
