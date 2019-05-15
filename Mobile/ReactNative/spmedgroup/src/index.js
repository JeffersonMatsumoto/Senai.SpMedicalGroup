import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createDrawerNavigator
} from 'react-navigation';

// https://reactnavigation.org/docs/en/getting-started.html
// npm install --save react-navigation
// npm install --save react-native-gesture-handler

import Login from "./pages/Login";
import ConsultasMedico from "./pages/ConsultasMedicos";
import ConsultasPaciente from "./pages/ConsultasPacientes";

const authStack = createStackNavigator(
	
	{
		"Login": Login,
		"Consultas Medico": ConsultasMedico,
		"Consultas Paciente": ConsultasPaciente
	},

	{
		initialRouteName: "Consultas Medico"
	}

)

export default createAppContainer(
  createSwitchNavigator(

    {
			"Login": authStack
		},

		{
			initialRouteName:"Login"
		}

  )
)
// https://stackoverflow.com/questions/46684007/react-native-stacknavigator-initialroutename