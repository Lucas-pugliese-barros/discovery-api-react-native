import Reactotron from 'reactotron-react-native';

// Set IP to Reactotron
const host = '192.168.22.56';

if (__DEV__) {
  const tron = Reactotron.configure({ host })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
