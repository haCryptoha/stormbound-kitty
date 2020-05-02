import React from 'react'
import { Helmet } from 'react-helmet-async'

export default React.memo(function PageMeta(props) {
  return (
    <Helmet titleTemplate='%s — Stormbound Kitty'>
      <title>{props.title}</title>
      <meta property='og:title' content={props.title} />
      <meta name='description' content={props.description} />
      {!!props.author && <meta name='author' content={props.author} />}
      <meta property='og:description' content={props.description} />
      <meta property='og:site_name' content='Stormbound Kitty' />
      <meta property='og:url' content={window.location.href} />
      <meta property='og:type' content='website' />
      {!!props.image && <meta property='og:image' content={props.image} />}
      {props.noIndex && <meta name='robots' content='noindex, nofollow' />}
    </Helmet>
  )
})
