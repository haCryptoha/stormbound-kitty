import React from 'react'
import Member from '~/components/Member'
import Layout from '~/components/Layout'
import getMemberContent from '~/helpers/getMemberContent'
import getMembersList from '~/helpers/getMembersList'

export async function getStaticPaths() {
  const paths = getMembersList().map(({ member }) => ({
    params: { id: member },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const id = context.params.id.toLowerCase()
  const { channel, count, content, details, displayName, roles } =
    getMemberContent(id)

  return {
    props: {
      id,
      channel,
      content,
      count,
      details,
      displayName,
      roles,
    },
  }
}

const MemberPage = props => (
  <Layout active={['COMMUNITY', 'MEMBERS']}>
    <Member memberId={props.id} {...props} />
  </Layout>
)

export default MemberPage