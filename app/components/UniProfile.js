import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { favouriteUni } from '../actions/actions'
import { connect } from 'react-redux'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import * as Api from '../lib/Api'

import Loading from './Loading'
import ProfileInfoList from './list/ProfileInfoList'

const UNI_QUERY = gql`
query ($pubukprn: String!) {
  university(pubukprn: $pubukprn) {
    name
    sortableName
    pubukprn
    campuses {
      name,
      location {
        lat
        lon
      }
      locationType
      nearestTrainStation {
        name
        code
        location {
          lat
          lon
        }
        distance
      }
      averageRent
    }
    uniType
    unionUrl
    url
    color
  }
}
`

class UniProfile extends Component {
  constructor (props) {
    super(props)

    this.toggleFavourite = this.toggleFavourite.bind(this)
  }

  // Called when the user presses the favourite (star) button.
  toggleFavourite () {
    const { favouriteUni, data } = this.props
    favouriteUni(data.university)
  }

  showCoursesButtonPressed () {
    this.props.navigation.navigate(
      'CourseList', {
        university: this.props.data.university
      }
    )
  }

  uniTableDataFrom (university) {
    const tableRows = []

    // PUBUKPRN for debugging.
    // TODO: Remove for production.
    if (university.pubukprn !== null) {
      tableRows.push({
        key: 'PUBUKPRN',
        value: university.pubukprn
      })
    }

    // University URL
    if (university.url !== null) {
      tableRows.push({
        key: 'University URL',
        value: university.url
      })
    }

    // SU URL
    if (university.unionUrl !== null) {
      tableRows.push({
        key: 'Union URL',
        value: university.unionUrl
      })
    }

    // Uni type
    if (university.uniType !== null) {
      let uniType = ''

      if (university.uniType === 'CAMPUS') {
        uniType = 'Campus'
      } else {
        uniType = 'City'
      }

      tableRows.push({
        key: 'University Type',
        value: uniType
      })
    }

    return tableRows
  }

  campusTableDataFrom (campus) {
    const tableRows = []

    // Campus Name
    if (campus.name !== null) {
      tableRows.push({
        key: 'Campus Name',
        value: campus.name
      })
    }

    // Location type
    if (campus.locationType !== null) {
      let locationType = ''

      switch (campus.locationType) {
        case 'CITY':
          locationType = 'City'
          break
        case 'SEASIDE_CITY':
          locationType = 'Seaside City'
          break
        default:
          locationType = 'Town'
      }

      tableRows.push({
        key: 'Location Type',
        value: locationType
      })
    }

    // Nearest train station name
    if (campus.nearestTrainStation !== null) {
      tableRows.push({
        key: 'Nearest Station',
        value: campus.nearestTrainStation.name
      })

      // Station code
      if (campus.nearestTrainStation.code !== null) {
        tableRows.push({
          key: 'Station Code',
          value: campus.nearestTrainStation.code
        })
      }

      // Distance
      tableRows.push({
        key: 'Distance From Campus',
        value: campus.nearestTrainStation.distance + ' miles'
      })
    }

    // Average rent
    if (campus.averageRent !== null) {
      tableRows.push({
        key: 'Average Rent (excl. bills)',
        value: '£' + campus.averageRent
      })
    }

    return tableRows
  }

  imageFrom (university) {
    if (university.url !== null) {
      return <Image source={{ uri: Api.urlForUniLogo(university.url) }} style={styles.logoImage} />
    } else if (university.unionURL !== null) {
      return <Image source={{ uri: Api.urlForUniLogo(university.unionURL) }} style={styles.logoImage} />
    }
  }

  renderUniInfo (data) {
    if (data.loading) {
      return <Loading />
    } else {
      const university = data.university
      const { favouriteUnis } = this.props

      // The default uni (background) color.
      let universityColor = styles.container.backgroundColor

      if (university.color !== null) {
        universityColor = university.color
      }

      const containerStyle = StyleSheet.create(
        { uniBackground: { backgroundColor: universityColor } }
      )

      let uniFavourited = false

      favouriteUnis.forEach(function (uni) {
        if (uni.pubukprn === university.pubukprn) {
          uniFavourited = true
        }
      })

      const campusTables = university.campuses.map(campus => {
        return (
          <View key={campus.location.lat + campus.location.lon}>
            <Text style={styles.campusSeparatorText}>Campus Information</Text>
            <ProfileInfoList data={this.campusTableDataFrom(campus)} />
          </View>
        )
      })

      return (
        <View style={[styles.container, containerStyle.uniBackground]}>
          <TouchableOpacity style={styles.favouriteButton} onPress={() => this.toggleFavourite(university)}>
            <Ionicons name={`ios-star${uniFavourited ? '' : '-outline'}`} size={28} color='white' />
          </TouchableOpacity>

          {this.imageFrom(university)}

          <Text style={styles.uniName}>{university.name}</Text>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            <ProfileInfoList
              data={this.uniTableDataFrom(university)} />

            {campusTables}

            <Button
              style={styles.showCourses}
              text='Show Courses'
              onPress={() => this.showCoursesButtonPressed()} />
          </ScrollView>
        </View>
      )
    }
  }

  render () {
    const { data } = this.props

    return (
      <View style={styles.container}>
        {this.renderUniInfo(data)}
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
  favouriteButton: {
    marginTop: 12,
    marginBottom: 12
  },
  logoImage: {
    marginTop: 16,
    width: 70,
    height: 70,
    borderRadius: 5
  },
  uniName: {
    color: 'rgba(255,255,255,1)',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '900',
    fontSize: 20
  },
  campusSeparatorText: {
    color: 'white',
    margin: 12,
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center'
  },
  showCourses: {
    marginTop: 20,
    marginBottom: 12
  }
})

const UniProfileWithData = graphql(UNI_QUERY, {
  options: (props) => ({
    variables: {
      pubukprn: props.navigation.state.params.university.pubukprn
    }
  })
})(UniProfile)

const mapStateToProps = state => {
  return {
    favouriteUnis: state.favouriteUnis
  }
}

const mapDispatchToProps = dispatch => {
  return {
    favouriteUni: uni => dispatch(favouriteUni(uni))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UniProfileWithData)
