const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.NEXT_PUBLIC_SERVER_PORT || 5001; //Line 3
const Cors = require("cors");

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.use(
  Cors({
    headers: { "Content-Type": ["Application/json"] },
    origin: ["http://localhost:3000", "http://localhost:5001"],
    methods: ["POST", "GET", "HEAD"],
  })
);

// create a GET route
app.get("/express_backend", async (req, res) => {
  //Line 9

  res.json({
    data: {
      api: "localhost:3000",
    },
  });
  // res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});
