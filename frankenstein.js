/*===== FRANKENSTEIN CODE =====*/

/* Web API Call */
let newsObj;
axios
  .get(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&sources=cnn,bbc&languages=en&categories=technology,science`
  )
  .then((obj) => {
    newsObj = obj.data;
  });

app.get("/", (req, res) => {
  res.render("partials/newsFeed", { newsObj });
});

/* User findOrCreate */
db.user
  .findOrCreate({
    where: {
      firstName: "Jacob",
      lastName: "Washington",
      email: "example1@email.com",
      password: "password",
    },
  }).then (user => {
    console.log(user)
  })
  .catch((e) => {
    console.log(e);
  });