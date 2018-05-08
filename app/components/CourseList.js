import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import Loading from './Loading'
import UniCourseList from './list/UniCourseList.js'

const COURSE_LIST_QUERY = gql`
    query ($pubukprn: String!) {
      courseList(pubukprn: $pubukprn) {
        title
        kiscourseid
        isFullTime
        courseURL
        years
        placementYearAvaliable
        yearAbroadAvaliable
        degreeLabel
        isHons
        rating
      }
    }
  `

class CourseList extends Component {
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

  renderCourseList (data) {
    if (data.loading) {
      return <Loading />
    } else {
      return (
        <View style={styles.container}>
          <UniCourseList data={data.courseList} keyExtractor={(item) => item.title} onPressItem={this.onPressItem} />
        </View>
      )
    }
  }

  render () {
    const { data } = this.props
    return (
      <View style={styles.container}>
        {this.renderCourseList(data)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a64db',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
})

const CourseListWithData = graphql(COURSE_LIST_QUERY, {
  options: (props) => ({
    variables: {
      pubukprn: props.navigation.state.params.university.pubukprn
    }
  })
})(CourseList)

export default CourseListWithData
