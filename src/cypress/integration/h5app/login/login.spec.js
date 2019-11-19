/* eslint-disable no-undef */
/*
 * @Author: 吴占超
 * @Date: 2019-09-05 10:50:10
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-09-05 16:54:10
 * assert
 */
describe('login.spec', () => {
  beforeEach(function() {
    // 对 btn.text() 取个别名叫 'text'
    cy.server();
  });
  it('e2e qrcode', () => {
    // cy.visit('/');
    // cy.wait(1000);
    // cy.get(':nth-child(3) > .uni-tabbar__bd > .uni-tabbar__icon > img').click();
    cy.visit('http://localhost:8090/web/');
    // 弹出二维码
    cy.get('[data-cy=qrcode]').click();
    // cy.get('.uni-popup__mask').click();
  });

  it('fb-login', () => {
    cy.visit('http://localhost:8090/web/');
    cy.get('[data-cy=fblogin]').click();
  });

  it('home check hose', () => {
    cy.route('/api/app-community/find-list').as('ajaxCommunity');

    cy.get('[data-cy=changeCommunity]').click();
    cy.wait('@ajaxCommunity').then(xhr => {
      assert(xhr.status === 200);
      assert(xhr.response.body);
    });
    cy.get('[data-cy=item]').then(result => {
      console.log(result.length);
      assert(result.length > 0);
      const index = Math.round(Math.random() * result.length);
      console.log(`index:${index}`);
      result[index].click();
    });
  });

  it('home search', () => {
    cy.route('/api/product/find-product-list?*').as('findProductList');

    cy.get('.uni-input-input').type(`{enter}`);
    cy.wait('@findProductList').then(xhr => {
      assert(xhr.status === 200);
      assert(xhr.response.body.count > 0);
      if (xhr.response.body.count > 10) {
        cy.get('[data-cy=product-9]').click();
        cy.wait('@findProductList');
        cy.wait(1000);
      }
    });
    // cy.get('[data-cy=t-1]').click();
    // cy.wait('@findProductList');
    // cy.get('[data-cy=t-2]').click();
    // cy.wait('@findProductList');
    // cy.get('[data-cy=t-3]').click();
    // cy.wait('@findProductList');
    // cy.get('[data-cy=t-3]').click();
    // cy.wait('@findProductList');

    // cy.get('[data-cy=product]').then(result => {
    //   console.log(result.length);
    //   assert(result.length > 0);
    //   // const index = Math.round(Math.random() * result.length);
    //   // console.log(`index:${index}`);
    //   // result[index].click();
    // });

    cy.get('.uni-btn-icon').click();
  });

  it('電競預約', () => {
    cy.route('/api/esport/f-seat?*').as('ajaxSeat');
    cy.route('/api/esport/p-vr?*').as('ajaxVr');
    cy.get('[data-cy=serviceClick-0]').click();
    cy.wait(['@ajaxSeat', '@ajaxVr']).then(xhrs => {

    });
  });

  after(() => { });
});
