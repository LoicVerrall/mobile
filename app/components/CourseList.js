import React, { Component } from 'react'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import UniCourseList from './list/UniCourseList.js'

const COURSE_LIST_QUERY = gql`
    query ($pubukprn: String!) {
      courseList(pubukprn: $pubukprn) {
        title
        kiscourseid
        isFullTime
        courseURL
        years
        placementYearAvailable
        yearAbroadAvailable
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

  render () {
    const { university } = this.props
    return <UniCourseList data={university} keyExtractor={(item) => item.title} onPressItem={this.onPressItem} />
  }
}

const CourseListWithData = graphql(COURSE_LIST_QUERY, {
  options: (props) => ({
    variables: {
      pubukprn: props.navigation.state.params.university.pubukprn
    }
  })
})(CourseList)

export default CourseListWithData
