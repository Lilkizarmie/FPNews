import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashMessage from "react-native-flash-message";
import RootNavigation from './src/navigation/RootNavigation';
import Provider  from "react-redux";
import store from './src/redux/store';

function App() {
  
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <RootNavigation />
        <FlashMessage floating={true} position="top" />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
