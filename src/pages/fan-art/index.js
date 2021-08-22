import React from 'react'
import FanArt from '~/components/FanArt'
import Layout from '~/components/Layout'
import ARTWORKS from '~/data/artworks'
import shuffle from '~/helpers/shuffle'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation(), artworks: shuffle(ARTWORKS) } }
}

const FanArtPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'DISCOVER', 'FAN_ART']} navigation={navigation}>
    <FanArt {...props} />
  </Layout>
)

export default FanArtPage
