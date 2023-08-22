import MainNav from "../../pages/main-nav/main-nav";
import MyAccount from "../../pages/account/my-account";
import { userData, userSessionData } from "../../pages/payload/user";
import Page from "../../pages/page";

const mainNav = new MainNav();
const account = new MyAccount();

describe("Wallet tests", () => {

  before(() => {
    cy.visit("/");
  });

  after(() => {
    cy.isMetamaskWindowActive().then((active) => {
      if (active === true) {
        cy.closeMetamaskWindow();
      }
    });
  });

  context("Connect metamask wallet and account tests", () => {
    it.only(`should login with success`, () => {

      mainNav.handleConnectBrowserWallet()
      mainNav.connectGitHubAccount();
      cy.wait(10000)

    });
  });

  it(`should lock $bepro account`, () => {
    mainNav.getWalletButton().click({ force: true });
    cy.url().should("contain", "bepro/account");
    account.getOracles().click({ force: true });
    cy.url().should("contain", "bepro/account/my-oracles");
    cy.wait(500);
    account.getInputLock().type(Cypress.env("councilMemberValue"), { force: true });
    cy.wait(500);
    account.handleApprove();
    cy.wait(500)
    account.getButtonLockTransaction().click({ force: true });
    cy.wait(500)
    account.getModalButtonConfirm().click();
    cy.wait(500);
    account.confirmMetamaskTransaction();
    mainNav.waitForTransactionSuccess();
  });

  it(`should unlock $bepro account`, () => {
    account.getButtonUnlock().click({ force: true });
    account.getInputUnlock().clear({ force: true }).type(100);
    account.getButtonUnlockTransaction().click({ force: true });
    cy.wait(500);
    account.getModalButtonConfirm().click();
    cy.wait(500);
    account.confirmMetamaskTransaction();
    mainNav.waitForTransactionSuccess();
  });

  it(`should delegate oracles`, () => {
    account.getInputDelegateAmount().type(10, { force: true });
    account.getInputDelegateAddress().type(Cypress.env("delegationAddress"), { force: true });
    account.getButtonDelegate().click({ force: true });
    cy.wait(500);
    account.confirmMetamaskTransaction();
    mainNav.waitForTransactionSuccess();
    cy.wait(1000)
  });
});
