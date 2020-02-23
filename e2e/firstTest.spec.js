/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const TIME_TO_WAIT = 10000;

describe('Automation started', () => {
  before(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('list all api items', async () => {
    await waitFor(element(by.id('remoteFlatList')))
      .toExist()
      .withTimeout(TIME_TO_WAIT);
  });

  it('tap on first six items', async () => {
    for (let i = 0; i < 6; i += 1) {
      await element(by.id(`check-${i}`)).tap();
    }
  });

  it('navigate to favorites', async () => {
    await element(by.id(`heartButton`)).tap();

    await waitFor(element(by.id('favoritesFlatList')))
      .toExist()
      .withTimeout(TIME_TO_WAIT);
  });

  after(async () => {
    await device.terminateApp();
  });
});
