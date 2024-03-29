const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = []
const start = function (){
inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the managers name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the managers id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the managers email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the managers office number?"
    },

])
.then (function (response){
console.log(response)
const manager = new Manager (response.name, response.id, response.email, response.officeNumber)
teamMembers.push(manager)
addTeamMember()
});
}

const addTeamMember = function (){
inquirer.prompt ([
{
    type:"list",
    name:"role",
    message:"What employee do you want to add next?",
    choices:["intern", "engineer","quit"]

}
]).then (function(response){
    if (response.role === "intern"){
    addintern()
    }
    else if (response.role === "engineer"){
    addengineer()
    }
    else {
    quit()
    }
})

}

const addintern = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern school?"
        },

])
.then (function (response){
console.log(response)
const intern = new Intern (response.name, response.id, response.email, response.school)
teamMembers.push(intern)
addTeamMember()
});

};


const addengineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineers github?"
        },

])
.then (function (response){
console.log(response)
const engineer = new Engineer (response.name, response.id, response.email, response.github)
teamMembers.push(engineer)
addTeamMember()
});

};

const quit = () => {
if (! fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}
fs.writeFileSync(outputPath, render(teamMembers), "utf8")

} 

start()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
