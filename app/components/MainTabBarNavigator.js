import React from 'react'
import { TabBarBottom, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

// Component imports
import Search from './Search'
import Favourites from './Favourites'
import Settings from './Settings'

export default TabNavigator(
  {
    'Search': { screen: Search },
    'Favourites': { screen: Favourites },
    'Settings': { screen: Settings }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName

        if (routeName === 'Search') {
          iconName = `ios-search`
        } else if (routeName === 'Favourites') {
          iconName = `ios-star`
        } else if (routeName === 'Settings') {
          iconName = `ios-settings`
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: 'lightblue',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        backgroundColor: '#12438f'
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false
  }
)
