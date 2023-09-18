describe("api test", () => {
  let token = "";
  let user = require("../fixtures/example.json");
  it("register with user data source", () => {
    cy.request({
      url: "https://practice.expandtesting.com/notes/api/users/register",
      method: "POST",
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  });

  it("login with user data source", () => {
    cy.request({
      url: "https://practice.expandtesting.com/notes/api/users/login",
      method: "POST",
      body: {
        email: user.email,
        password: user.password,
      },
    }).then((response) => {
      expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("status");
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("token");
      token = response.body.data.token;
    });
  });
  it("post a note from the user data source", () => {
    const options = {
      method: "POST",
      url: "https://practice.expandtesting.com/notes/api/notes",
      headers: {
        "x-auth-token": token,
      },
      body: {
        title: user.title,
        description: user.description,
        category: "Home",
      },
    };

    cy.request(options).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
