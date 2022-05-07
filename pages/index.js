import Head from 'next/head'
import Template from '../components/Template/Template.jsx'
import Timer from '../components/Timer/Timer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Pomodoro</title>
        <meta name="description" content="main page app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Template>
        <Timer />
      </Template>
    </>
  )
}
