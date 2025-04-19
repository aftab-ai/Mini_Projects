// Import dependencies.
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([{ message: "Type in your URL: ", name: "URL" }])
  // Prompt get the url from the user.

  .then((answers) => {
    const url = answers.URL;
    // Save the url in a variable.

    let qr_img = qr.image(url);
    // Turn url into qr image.

    qr_img.pipe(fs.createWriteStream("qr_img.png"));
    // Create a qr-image file.

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    // Generate new txt file and paste the user URL.
  })
  .catch((err) => {
    if (err.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment!");
    } else {
      console.log(err);
    }
  });
