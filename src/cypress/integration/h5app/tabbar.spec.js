/* eslint-disable no-undef */
/*
 * @Author: 吴占超
 * @Date: 2019-08-19 11:50:30
 * @Last Modified by: 王肇峰
 * @Last Modified time: 2019-08-23 11:25:12
 */
describe('tabbar test', () => {
  beforeEach(function() {
    // 对 $btn.text() 取个别名叫 'text'
  });
  it('tabbar', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get(':nth-child(3) > .uni-tabbar__bd > .uni-tabbar__icon > img').click();
    cy.wait(1000);
    cy.get(':nth-child(4) > .uni-tabbar__bd > .uni-tabbar__icon > img').click();
    cy.wait(1000);
    cy.get(':nth-child(5) > .uni-tabbar__bd > .uni-tabbar__icon > img').click();
    cy.wait(1000);
    cy.get(':nth-child(6) > .uni-tabbar__bd > .uni-tabbar__icon > img').click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .uni-tabbar__bd > .uni-tabbar__icon > img').click();
  });

  after(() => {
  });
});
