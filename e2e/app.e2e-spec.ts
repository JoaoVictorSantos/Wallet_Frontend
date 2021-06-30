import { WalletFrontendPage } from './app.po';

describe('wallet-frontend App', function() {
  let page: WalletFrontendPage;

  beforeEach(() => {
    page = new WalletFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
