/* eslint-disable no-undef */
describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Monday");
  });

  it("should book an interview", () => {
    cy.get("img[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").first().type("Lydia Miller-Jones", 100);
    cy.get("[alt='Sylvia Palmer']").first().click();
    cy.contains("Save").first().click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({force: true});
    cy.get('[data-testid=student-name-input]').first().clear().type("Lydia Miller-Jones", 100);
    cy.get("[alt='Tori Malcolm']").first().click();
    cy.contains("Save").first().click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").first().click({force: true});
    cy.contains("Confirm").first().click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains("appointment-card--show", "Archie Cohen").should("not.exist");
  });

});