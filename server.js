const express = require('express');
const app = express();
const fetch = require('node-fetch');
const fs = require("fs");
app.use(express.json());

// FOR SERVING TEST PAGE DELETE ME 
app.use("/js", express.static("./website/js"));
app.use("/assets", express.static("./website/assets"));
app.use("/css", express.static("./website/css"));
app.use("/html", express.static("./website"));

const port = process.env.PORT || 5000;
const initSessionHref = "https://endlessmedicalapi1.p.rapidapi.com/InitSession";
const acceptTermsHref = "https://endlessmedicalapi1.p.rapidapi.com/AcceptTermsOfUse?passphrase=I%20have%20read%2C%20understood%20and%20I%20accept%20and%20agree%20to%20comply%20with%20the%20Terms%20of%20Use%20of%20EndlessMedicalAPI%20and%20Endless%20Medical%20services.%20The%20Terms%20of%20Use%20are%20available%20on%20endlessmedical.com&SessionID=";
const getOutcomesHref = "https://endlessmedicalapi1.p.rapidapi.com/GetOutcomes";
const getFeaturesHref = "https://endlessmedicalapi1.p.rapidapi.com/GetFeatures";
const updateFeatureHref = "https://endlessmedicalapi1.p.rapidapi.com/UpdateFeature";
const deleteFeatureHref = "https://endlessmedicalapi1.p.rapidapi.com/DeleteFeature";
const analyzeHref = "https://endlessmedicalapi1.p.rapidapi.com/Analyze";
const getSuggestionsHref = "https://api.endlessmedical.com/v1/dx/GetSuggestedFeatures_PatientProvided";
const getDocumentationHref = "https://api.endlessmedical.com/v1/dx/GetMedicalDocumentation";
const getSpecializationsHref = "https://api.endlessmedical.com/v1/dx/GetSuggestedSpecializations";

app.get("/", (req, res) => {
  const doc = fs.readFileSync("./website/index.html", "utf8");
  res.send(doc);
})

app.get("/home.html", (req, res) => {
  const doc = fs.readFileSync("./website/home.html", "utf8");
  res.send(doc);
})

app.get("/init", (req, res) => {
  fetch(initSessionHref, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'endlessmedicalapi1.p.rapidapi.com',
      'x-rapidapi-key': 'bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df'
    }
  })
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData, "init session");
      res.send(jsonData);
    });
})

app.get("/getOutcomes", (req, res) => {
  fetch(getOutcomesHref, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df"
    }
  })
    .then(response => response.json())
    .then(jsonData => {
      res.send(jsonData);
    })

})

app.get("/getFeatures", (req, res) => {
  fetch(getFeaturesHref, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df"
    }
  })
    .then(response => response.json())
    .then(jsonData => {
      res.send(jsonData);
    })
})

app.post("/getSuggestions", (req, res) => {
  const url = getSuggestionsHref + "?SessionID=" + req.body.SessionID;
  fetch(url, {
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df"
    }
  })
    .then(response => response.json())
    .then(jsonData => {
      res.send(jsonData);
    })
})

app.post("/getDocumentation", (req, res) => {
  const url = getDocumentationHref + "?SessionID=" + req.body.SessionID + "&format=json";
  fetch(url, {
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df"
    }
  })
    .then(response => response.json())
    .then(jsonData => {
      res.send(jsonData);
    })
})

app.post("/getSpecializations", (req, res) => {
  const url = getSpecializationsHref + "?SessionID=" + req.body.SessionID;
  fetch(url, {
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df"
    }
  })
    .then(response => response.json())
    .then(jsonData => {
      res.send(jsonData);
    })
})

app.post("/analyze", (req, res) => {
  const url = analyzeHref + "?SessionID=" + req.body.SessionID;
  fetch(url, {
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df"
    }
  })
    .then(response => response.json())
    .then(jsonData => {
      res.send(jsonData);
    })
})

app.post("/acceptTerms", (req, res) => {
  fetch(acceptTermsHref + req.body.SessionID, {
    method: "POST",
    headers: {
      'x-rapidapi-host': 'endlessmedicalapi1.p.rapidapi.com',
      'x-rapidapi-key': 'bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df'
    }
  })
    .then(response => {
      console.log("accept terms status: " + response.status)
      res.send(response)
    });
})

// adding symptoms
app.post("/updateFeature", (req, res) => {
  const url = `${updateFeatureHref}?SessionID=${req.body.SessionID}&name=${req.body.name}&value=${req.body.value}`;
  fetch(url, {
    method: "POST",
    headers: {
      'x-rapidapi-host': 'endlessmedicalapi1.p.rapidapi.com',
      'x-rapidapi-key': 'bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df'
    }
  })
    .then(response => {
      console.log("update feature status: " + response.status);
      res.send(response)
    });
})

// remove symptoms
app.post("/deleteFeature", (req, res) => {
  const url = `${deleteFeatureHref}?SessionID=${req.body.SessionID}&name=${req.body.name}`;
  fetch(url, {
    method: "POST",
    headers: {
      'x-rapidapi-host': 'endlessmedicalapi1.p.rapidapi.com',
      'x-rapidapi-key': 'bd4d467d0emsh624d400ea624605p1e1fb6jsnf85132a7d3df'
    }
  })
    .then(response => {
      console.log("delete feature status: " + response.status);
      res.send(response)
    });
})


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


// Code to format SymptomsOutput.json
// let jsonData = JSON.parse(fs.readFileSync("./SymptomsOutput.json", "utf8"));

// let formatted = {};

// jsonData.forEach(element => {
//   formatted[element.name] = element;
// })

// formatted = JSON.stringify(formatted);

// fs.writeFile("output.json", formatted, 'utf8', err => {
//   if(err) {
//     return console.log(err);
//   }
//   console.log("it wrote");
// })
