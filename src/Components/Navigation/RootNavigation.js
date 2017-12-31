import {
  StackNavigator,
} from 'react-navigation';
import Main from '../../Main';
import Public from '../../Public/Public';
import Secure from '../../Secure/Secure';


const RootNavigation = StackNavigator({
  Main: { screen: Main },
  Public: { screen: Public },
  Secure: { screen: Secure },
});

export default RootNavigation;
