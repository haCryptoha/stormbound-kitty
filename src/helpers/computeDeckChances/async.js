import * as Comlink from 'comlink'

let fn = null

// The Comlink integration works differently when going through Webpack or when
// run directly from Node.js, so we check whether the window object exists to
// know which environment we’re in.
if (typeof window === 'undefined') {
  // Webpack will try to bundle `worker_threads` and fail. This is usually fixed
  // by using `IgnorePlugin` but this cannot be done without ejecting CRA, which
  // is not what we want. By using `eval`, we can circumvent the Webpack bundle
  // error and use `require` when running from Node.
  // eslint-disable-next-line no-eval
  const { Worker } = eval('require')('worker_threads')
  const nodeEndpoint = require('comlink/dist/umd/node-adapter.js')
  // The full path appears to be necessary when running in Node, since the
  // process is run from the root of the project.
  const worker = nodeEndpoint(
    new Worker('./src/helpers/computeDeckChances/worker.js')
  )

  fn = Comlink.wrap(worker)
} else {
  // This appears to be the way to use Comlink with Webpack.
  // See: https://dev.to/nicolasrannou/web-workers-in-create-react-app-cra-without-unmounting-4865
  // eslint-disable-next-line import/no-webpack-loader-syntax
  const Worker = require('worker-loader!./worker')
  fn = Comlink.wrap(new Worker())
}

// Export the helper as an asynchronous function that can be executed off the
// main thread in a dedicated service worker.
export default fn
