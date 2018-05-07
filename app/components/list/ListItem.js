import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

export default class ListItem extends Component {
  constructor (props) {
    super(props)
    this._onPress = this._onPress.bind(this)
  }

  _onPress () {
    this.props.onPressItem(this.props.item)
  }

  render () {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 50,
    borderColor: 'rgba(50, 0, 0, 0.2)',
    borderBottomWidth: 1
  },
  itemText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 12
  }
})
