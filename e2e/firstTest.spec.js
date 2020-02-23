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
    // await element(by.id(`check-0`)).tap();
    // await element(by.id(`check-1`)).tap();
    // await element(by.id(`check-2`)).tap();
    // await element(by.id(`check-3`)).tap();
    // await element(by.id(`check-4`)).tap();
    // await element(by.id(`check-5`)).tap();
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
