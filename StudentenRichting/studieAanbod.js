fetch("studieAanbod.json")
  .then(response => response.json())
  .then(data => {
    // create buttons for 2e graad richtingen
    const button1Container = document.querySelector(".container1");
    data["2e graad"]["richtingen"].forEach(richting => {
      const button = document.createElement("button");
      button.textContent = richting["naam"];
      button1Container.appendChild(button);
      button.classList.add("button1");
    });
    
    // create buttons for 3e graad richtingen
    const button2Container = document.querySelector(".container2");
    data["3e graad"]["richtingen"].forEach(richting => {
      const button = document.createElement("button");
      button.textContent = richting["naam"];
      button2Container.appendChild(button);
      button.classList.add("button2");
    });
    
    // add event listener to each button
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
      button.addEventListener("mouseenter", () => {
        // highlight button and verwanten
        button.classList.add("highlight");
        const verwanten = data["2e graad"]["richtingen"]
          .concat(data["3e graad"]["richtingen"])
          .find(richting => richting["naam"] === button.textContent)["verwanten"];
        verwanten.forEach(verwant => {
          const matchingButton = [...buttons].find(b => b.textContent === verwant);
          matchingButton.classList.add("highlight-red");
        });
      });
      
      button.addEventListener("mouseleave", () => {
        // remove highlight from button and verwanten
        button.classList.remove("highlight");
        const verwanten = data["2e graad"]["richtingen"]
          .concat(data["3e graad"]["richtingen"])
          .find(richting => richting["naam"] === button.textContent)["verwanten"];
        verwanten.forEach(verwant => {
          const matchingButton = [...buttons].find(b => b.textContent === verwant);
          matchingButton.classList.remove("highlight-red");
        });
      });
    });
  })
  .catch(error => console.log(error));
