import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    create
} from 'react-navigation';

import Login from "./pages/Login";
import ConsultasMedico from "./pages/ConsultasMedicos";
import ConsultasPaciente from "./pages/ConsultasPacientes";

const Main = createDrawerNavigator( 
    {
        "Login": {
            screen: Login
        }
    },
    
    {
        initialRouteName: "Login",
    }
)

export default createAppContainer(
        {
            Main        
        },
        {
            initialRouteName: "Login"
        }
    )
);

export default Navigator;


// https://stackoverflow.com/questions/46684007/react-native-stacknavigator-initialroutename