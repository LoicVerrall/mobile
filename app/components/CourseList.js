import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

import UniCourseList from './UniCourseList.js'

export default class CourseList extends React.Component {
  constructor (props) {
    super(props)

    this.onPressItem = this.onPressItem.bind(this)
  }

  onPressItem (item) {
    this.props.navigation.navigate(
      'CourseProfile', {
        course: item
      }
    )
  }

  render () {
    const { university } = this.props
    return <UniCourseList data={university} keyExtractor={(item) => item.title} onPressItem={this.onPressItem} />
  }
}
