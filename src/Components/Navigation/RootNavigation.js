import {
  StackNavigator,
} from 'react-navigation';
import Main from '../../Main';
import Public from '../../Public/Public';
import Secure from '../../Secure/Secure';
import ProfilePage from '../../Secure/profilePage';


const RootNavigation = StackNavigator({
  Main: { screen: Main },
  Public: { screen: Public },
  Secure: { screen: Secure },
  ProfilePage: { screen: ProfilePage },

});

export default RootNavigation;
