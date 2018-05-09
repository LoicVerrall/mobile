import React, { Component } from 'react'
import { View, StyleSheet, Switch, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StackNavigator } from 'react-navigation'

import { connect } from 'react-redux'
import { toggleReducedColours } from '../actions/actions'

class Settings extends Component {
  render () {
    const { reducedColoursEnabled, toggleReducedColours } = this.props

    return (
      <View style={styles.container}>
        <Ionicons name={'ios-settings'} style={styles.logo} />

        <View style={styles.reducedColoursContainer}>
          <View>
            <Text style={styles.reducedColoursTitle}>Reduced Colours {reducedColoursEnabled ? 'Enabled' : 'Disabled'}</Text>
            <Text style={{color: 'lightgray'}}>{reducedColoursEnabled ? 'Use standard blue background throughout' : 'Use dominant uni colour'}</Text>
          </View>

          <Switch
            value={reducedColoursEnabled}
            onValueChange={() => toggleReducedColours()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1a64db'
  },
  logo: {
    color: 'lightgray',
    marginTop: 45,
    marginBottom: 16,
    fontSize: 42
  },
  reducedColoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    width: '90%'
  },
  reducedColoursTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 6
  }
})

const mapStateToProps = state => {
  return { reducedColoursEnabled: state.reducedColoursEnabled }
}

const mapDispatchToProps = dispatch => {
  return { toggleReducedColours: () => dispatch(toggleReducedColours()) }
}

const settings = connect(mapStateToProps, mapDispatchToProps)(Settings)

const SettingsNavigator = StackNavigator(
  {
    Settings: { screen: settings }
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerTitle: 'Settings',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgb(28,68,138)'
      }
    }
  }
)

export default SettingsNavigator
