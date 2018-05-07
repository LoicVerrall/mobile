import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { favouriteUni } from '../actions/actions'
import { connect } from 'react-redux'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import * as Api from '../lib/Api'

import Loading from './Loading'

const UNI_QUERY = gql`
    query ($pubukprn: String!) {
      university(pubukprn: $pubukprn) {
        name
        pubukprn
        url
        unionURL
        color
        lat
        lon
        averageRent
        uniLocationType
        uniType
        nearestTrainStation
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

  tableDataFrom (university) {
    const tableRows = []

    // PUBUKPRN for debugging.
    // TODO: Remove for production.
    if (university.pubukprn !== null) {
      tableRows.push({
        key: 'PUBUKPRN',
        value: university.pubukprn
      })
    }

    // Nearest train station
    if (university.nearestTrainStation !== null) {
      tableRows.push({
        key: 'Nearest Station',
        value: university.nearestTrainStation
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
    if (university.unionURL !== null) {
      tableRows.push({
        key: 'Union URL',
        value: university.unionURL
      })
    }

    // Location type
    if (university.uniLocationType !== null) {
      let uniLocationType = ''

      switch (university.uniLocationType) {
        case 'CITY':
          uniLocationType = 'City'
          break
        case 'SEASIDE_CITY':
          uniLocationType = 'Seaside City'
          break
        default:
          uniLocationType = 'Town'
      }

      tableRows.push({
        key: 'Location Type',
        value: uniLocationType
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

    // Average rent
    if (university.averageRent !== null) {
      tableRows.push({
        key: 'Average Rent (excl. bills)',
        value: '£' + university.averageRent
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

      return (
        <View style={[styles.container, containerStyle.uniBackground]}>
          <TouchableOpacity style={styles.favouriteButton} onPress={() => this.toggleFavourite(university)}>
            <Ionicons name={`ios-star${uniFavourited ? '' : '-outline'}`} size={28} color='white' />
          </TouchableOpacity>

          {this.imageFrom(university)}

          <Text style={styles.uniName}>{university.name}</Text>

          <FlatList
            style={styles.infoTable}
            data={this.tableDataFrom(university)}
            renderItem={({item}) =>
              <View style={styles.infoRow}>
                <Text style={styles.heading}>{item.key}</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>} />

          <Button
            text='Show Courses' />
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
    backgroundColor: '#1a64db',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  favouriteButton: {
    marginTop: 12
  },
  logoImage: {
    marginTop: 16,
    width: 70,
    height: 70,
    borderRadius: 5
  },
  uniName: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '900',
    fontSize: 20
  },
  infoTable: {
    width: '100%'
  },
  infoRow: {
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
    marginRight: 16
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
