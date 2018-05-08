import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

export default class ProfileInfoList extends Component {
  renderItem (item) {
    return (
      <View style={styles.row}>
        <Text style={styles.heading}>{item.key}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    )
  }

  render () {
    return (
      <FlatList
        style={styles.list}
        data={this.props.data}
        renderItem={({item}) => this.renderItem(item)}
        keyExtractor={(item, index) => item.key} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  list: {
    width: '100%'
  },
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    minHeight: 40,
    alignItems: 'center'
  },
  heading: {
    flex: 1,
    color: 'lightgray',
    marginLeft: 16
  },
  value: {
    flex: 1,
    textAlign: 'right',
    color: 'white',
    marginRight: 16,
    marginTop: 5,
    marginBottom: 5
  }
})
