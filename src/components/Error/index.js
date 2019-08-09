import React, { Fragment } from 'react'
import PageMeta from '../PageMeta'
import Title from '../Title'
import CTA from '../CTA'
import './index.css'

const Error = props => (
  <Fragment>
    <div className="Error">
      <Title element="h1" className="Error__title">
        An error occurred
      </Title>

      <img
        src="/assets/images/cards/faun_companions.png"
        alt="Faun Companions"
      />

      <p>
        It looks like something went wrong… It’s definitely not your fault
        though, don’t worry!
      </p>
      <p>
        What you can do is report it to Kitty#1909 on the{' '}
        <a
          href="https://discord.gg/stormbound"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stormbound Discord
        </a>
        , along with the URL of this page and the following error:
      </p>

      <pre className="Error__pre">{props.error}</pre>

      {props.retry && <CTA onClick={props.retry}>Retry</CTA>}
    </div>

    <PageMeta
      title="Error"
      description="An error occurred, sorry about this!"
      noIndex
    />
  </Fragment>
)

export default Error
