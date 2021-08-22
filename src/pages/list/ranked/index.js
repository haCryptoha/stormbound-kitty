import React from 'react'
import RankedList from '~/components/RankedList'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const RankedListPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'RANKED_LIST']} navigation={navigation}>
    <RankedList {...props} />
  </Layout>
)

export default RankedListPage
