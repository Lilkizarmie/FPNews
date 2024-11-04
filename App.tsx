import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import CodePush from 'react-native-code-push';
import { getUserData } from './src/utils/utils';
import { saveUserData } from './src/redux/actions/auth';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

function App(): JSX.Element {
  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      console.log("User app data", userData);
      if (userData) {
        store.dispatch(saveUserData(userData));
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
        <FlashMessage floating={true} position="top" />
      </GestureHandlerRootView>
    </Provider>
  );
}

export default CodePush(codePushOptions)(App);
