import Page from "../page";
const page = new Page();

const login = Cypress.env('login_github_account');
const password = Cypress.env('password_github_account');

export default class MainNav extends Page {
  getWalletButton() {
    return cy.get(`a[href*="/bepro/account"] > .text-right`);
  }

  findAddressWallet() {
    return cy.find(".text-right > .mb-1");
  }

  handleConnectBrowserWallet() {
    cy.get("button").contains("Connect Wallet").click();
    page.acceptMetamaskAccessRequest();
  }

  connectGitHubAccount() {
    cy.get(".profile-menu").click();

    cy.get("button.text-white").contains("View profile").click();

    cy.url().should('contain', '/profile').then(() => {
      cy.get("span.caption-large").contains("Connect Github").click();
    })

    cy.url().should('contain', '/connect-account').then(() => {
      cy.get("span.caption-large").contains("Connect Github").click();
    })

    cy.origin('https://github.com/', () => {
      cy.url().should('contain', 'github').then(() => {
        cy.get("#login_field").type(login);
        cy.get("#password").type(password).type("{enter}");
      })
    })

  }
  // waitUntilLoggedIn() {
  //   cy.waitUntil(() => {
  //     const addressWallet = cy.get(".text-right > .mb-1");
  //     return addressWallet.should("exist");
  //   });
  //   // waiting for wallet button is not enough in rare cases to be logged in
  //   cy.wait(2000);
  // }

  getLoggedInWalletAddress() {
    return cy.get(".text-right > .mb-1").invoke("text");
  }
}
