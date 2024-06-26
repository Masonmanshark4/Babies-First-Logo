// packages and modules needed for the application
const inquirer = require("inquirer");
const SVG = require("./lib/SVG");
const { Circle, Triangle, Square } = require("./lib/shapes");
const { writeFile } = require("fs/promises");

// questions for user input
const generateSVG = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "shape",
            message: "Which shape would you like your svg to be?",
            choices: ["Circle", "Triangle", "Square"]
        },
        {
            type: "input",
            name: "shapeColor",
            message: "What color would you like your svg to be?"
        },
        {
            type: "input",
            name: "text",
            message: "What would you like the text to say, in your svg? (1-3 characters)"
        },
        {
            type: "input",
            name: "textColor",
            message: "What color would you like your text to be?"
        }
    ])
        .then((res) => {
            console.log(res);

            // Declare a variable to store the SVG shape object
            let svgShape;

            if (res.shape === "Circle") {
                svgShape = new Circle();
            }
            
            if (res.shape === "Triangle") {
                svgShape = new Triangle();
            }
            
            if (res.shape === "Square") {
                svgShape = new Square();
            }
            // Set the color of the shape object based on the user input
            svgShape.setColor(res.shapeColor)

            // function to generates svg file to Logos folder
            const svg = new SVG();
            svg.setText(res.text, res.textColor);
            svg.setShape(svgShape);
            return writeFile("./Logos/logo.svg", svg.render());
        }).then(() => {
            console.log("Your SVG logo has been successfully generated and named logo.svg in the examples folder");
        })
};

// Function call to generates SVG file
generateSVG();
