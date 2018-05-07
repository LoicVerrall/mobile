import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'

import { connect } from 'react-redux'

import UniProfile from './UniProfile'
import Loading from './Loading'
import NetworkError from './NetworkError'
import UniCourseList from './list/UniCourseList'

class Search extends Component {
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

  renderUniList (uniList) {
    if (uniList.isFetching) {
      return <Loading />
    } else if (uniList.fetchFailed) {
      return <NetworkError />
    } else {
      return <UniCourseList data={uniList.lookupTable} keyExtractor={(item) => item.name} onPressItem={this.onPressItem} />
    }
  }

  render () {
    const { uniLookupTable } = this.props

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />

        {this.renderUniList(uniLookupTable)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1a64db'
  }
})

const mapStateToProps = state => {
  return {
    uniLookupTable: state.uniLookupTable
  }
}

const mapDispatchToProps = dispatch => {
  return { }
}

const search = connect(mapStateToProps, mapDispatchToProps)(Search)

const headerTitleForNavigation = (navigation) => {
  if (navigation.state.routeName === 'Search') {
    return 'Search'
  } else {
    return ''
  }
}

const SearchNavigator = StackNavigator(
  {
    Search: { screen: search },
    UniProfile: { screen: UniProfile }
  },
  {
    headerMode: 'float',
    cardStyle: { backgroundColor: 'transparent' },
    navigationOptions: ({ navigation }) => ({
      headerTitle: headerTitleForNavigation(navigation),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgb(28,68,138)'
      }
    })
  }
)

export default SearchNavigator
