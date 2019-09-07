import Reactotron from 'reactotron-react-native';

// Set ip
const host = '192.168.22.56';

if (__DEV__) {
  const tron = Reactotron.configure({ host })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
