import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import Loading from './Loading'
import NetworkError from './NetworkError'
import ProfileInfoList from './list/ProfileInfoList'

const COURSE_QUERY = gql`
query ($pubukprn: String!, $kiscourseid: String!, $isFullTime: String!) {
  course(pubukprn: $pubukprn, kiscourseid: $kiscourseid, isFullTime: $isFullTime) {
    title
    kiscourseid
    isFullTime
    courseURL
    years
    placementYearAvailable
    yearAbroadAvailable
    degreeLabel
    isHons
  }
}
`

class CourseProfile extends Component {
  courseTableDataFrom (course) {
    const tableRows = []

    // KISCOURSEID for debugging.
    // TODO: Remove for production.
    if (course.kiscourseid !== null) {
      tableRows.push({
        key: 'KISCOURSEID',
        value: course.kiscourseid
      })
    }

    // courseURL
    if (course.courseURL !== null) {
      tableRows.push({
        key: 'Course URL',
        value: course.courseURL
      })
    }

    // Years
    if (course.years !== null) {
      tableRows.push({
        key: 'Degree Length',
        value: course.years + ' years'
      })
    }

    // Placement Year Available
    if (course.placementYearAvailable !== null) {
      tableRows.push({
        key: 'Placement Year Available',
        value: course.placementYearAvailable === 'true' ? '👍' : '👎'
      })
    }

    // Year Abroad Available
    if (course.yearAbroadAvailable !== null) {
      tableRows.push({
        key: 'Year Abroad Available',
        value: course.yearAbroadAvailable === 'true' ? '👍' : '👎'
      })
    }

    return tableRows
  }

  renderCourseInfo (data) {
    if (data.loading) {
      return <Loading />
    } else if (data.error) {
      return <NetworkError />
    } else {
      const course = data.course

      return (
        <View style={styles.container}>
          <Text style={styles.courseName}>{course.title}</Text>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            <ProfileInfoList
              data={this.courseTableDataFrom(course)} />
          </ScrollView>
        </View>
      )
    }
  }

  render () {
    const { data } = this.props

    return (
      <View style={styles.container}>
        {this.renderCourseInfo(data)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#1a64db'
  },
  scrollView: {
    width: '100%',
    height: '100%'
  },
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  courseName: {
    color: 'rgba(255,255,255,1)',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '900',
    fontSize: 20
  }
})

const CourseProfileWithData = graphql(COURSE_QUERY, {
  options: (props) => ({
    variables: {
      pubukprn: props.navigation.state.params.pubukprn,
      kiscourseid: props.navigation.state.params.course.kiscourseid,
      isFullTime: props.navigation.state.params.course.isFullTime
    }
  })
})(CourseProfile)

const mapStateToProps = state => {
  return { }
}

const mapDispatchToProps = dispatch => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseProfileWithData)
