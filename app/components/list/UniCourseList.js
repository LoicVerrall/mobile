import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'

import ListItem from './ListItem'

export default class UniCourseList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterTerm: ''
    }
  }

  // Called when the text in the search field is changed, and updates the state.
  searchTermChanged (text) {
    this.setState({
      filterTerm: text
    })
  }

  // Filters the list of data to only include those that match the search term.
  filterListBy (searchTerm) {
    const { data } = this.props

    if (searchTerm === undefined || searchTerm === '') {
      return data
    }

    if (data.length > 0) {
      let filteredList = data.filter((item) => {
        const itemText = this.props.keyExtractor(item)
        return itemText.toLowerCase().match(searchTerm.toLowerCase())
      })

      return filteredList
    }

    return data
  }

  renderItem (item) {
    const itemText = this.props.keyExtractor(item)
    return <ListItem text={itemText} item={item} onPressItem={this.props.onPressItem} />
  }

  render () {
    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={(text) => this.searchTermChanged(text)}
          onClearText={(text) => this.searchTermChanged(text)}
          containerStyle={styles.searchBox}
          inputStyle={styles.searchBoxInput}
          placeholderTextColor='rgba(250,250,250,0.6)'
          icon={{ color: 'white' }}
          clearIcon={{ color: 'white', name: 'clear' }}
          placeholder='type to search' />

        <FlatList
          style={styles.uniList}
          data={this.filterListBy(this.state.filterTerm)}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={(item, index) => this.props.keyExtractor(item)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  uniList: {
    width: '100%',
    backgroundColor: 'rgba(50, 0, 0, 0.2)'
  },
  searchBox: {
    width: '94%',
    marginTop: 16,
    marginBottom: 16,
    height: 50,
    borderRadius: 8,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  searchBoxInput: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  }
})
