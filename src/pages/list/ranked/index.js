import React from 'react'
import RankedList from '~/components/RankedList'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'
import getLiveTierList from '~/helpers/getLiveTierList'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return {
    props: {
      navigation: getNavigation(),
      list: getInitialListData(getLiveTierList()),
    },
  }
}

const RankedListPage = props => (
  <Layout
    active={['COMMUNITY', 'META', 'RANKED_LIST']}
    navigation={props.navigation}
  >
    <RankedList />
  </Layout>
)

export default RankedListPage
