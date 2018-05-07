import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'

import UniCourseList from './list/UniCourseList'
import UniProfile from './UniProfile'

class Favourites extends Component {
  constructor (props) {
    super(props)
    this.onPressItem = this.onPressItem.bind(this)
  }

  onPressItem (item) {
    this.props.navigation.navigate(
      'UniProfile', {
        university: item
      }
    )
  }

  renderFavouriteUniversitiesList () {
    const { favouriteUnis } = this.props
    if (favouriteUnis.length <= 0) {
      return <Text style={styles.noUnisText}>Universities You Favourite Will Appear Here</Text>
    } else {
      return <UniCourseList data={favouriteUnis} keyExtractor={(item) => item.name} onPressItem={this.onPressItem} />
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Ionicons name={'ios-star'} style={styles.logo} />
        {this.renderFavouriteUniversitiesList()}
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
  noUnisText: {
    color: 'white',
    fontWeight: '900',
    marginTop: 20,
    marginLeft: 24,
    marginRight: 24,
    textAlign: 'center'
  },
  favouriteUniList: {
    width: '100%',
    backgroundColor: 'rgba(50, 0, 0, 0.2)'
  }
})

const mapStateToProps = state => {
  return {
    favouriteUnis: state.favouriteUnis
  }
}

const mapDispatchToProps = dispatch => {
  return { }
}

const favourites = connect(mapStateToProps, mapDispatchToProps)(Favourites)

const headerTitleForNavigation = (navigation) => {
  if (navigation.state.routeName === 'Favourites') {
    return 'Favourites'
  } else {
    return ''
  }
}

const FavouritesNavigator = StackNavigator(
  {
    Favourites: { screen: favourites },
    UniProfile: { screen: UniProfile }
  },
  {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerTitle: headerTitleForNavigation(navigation),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgb(28,68,138)'
      }
    })
  }
)

export default FavouritesNavigator
