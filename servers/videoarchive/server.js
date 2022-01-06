//  a webhook/service running on the video archive server

//  it takes an MP4 URL as input and downloads the file
//  into the destination directory
//  it should also synthesize the required metadata 


const fast = require('fastify')({ logger: {level: 'debug'} })
const downloader = require('nodejs-file-downloader')
const S = require('fluent-json-schema')

// sync time waster function to similate download
const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// TODO compute required AVideo Directory here
// current default is same directory as code
const getDestinationDirectory = () => {
    return(".");
};

const synthesizeMetadata = async (request, destdir) => {
  // TODO synthesize the necessary metadata for AVideo Listing display
  // request has context information required
  // destdir is where the metadata should be placed
  const { meetingMonth, meetingDay, meetingYear } = request.query
  const metaToWrite = "***** Rocket.Chat Weekly on " + meetingYear + "/"
    + meetingMonth + "/" + meetingDay;
  fast.log.debug( metaToWrite );
  return true;
};
// sanity route to ensure server is still doing work
fast.get('/', async (request, reply) => {
  return { result: 'other calls continues' }
})

// testing endpoint for long synchronous tasks - such as file downloading
fast.get('/waste', async (request, reply) => {
  await sleep(20000);
  return { result: 'wasted 20 seconds' }
})

// handle the downloading of the MP4
fast.route({
  method: 'GET',
  path:  '/downloadmp4', 
  handler: async (request, reply) => {
    // tested to be fully functional 
    const destinationDirectoy = getDestinationDirectory();
    const { url } = request.query
    const downloadReq = new downloader({
    url: url,
    directory: destinationDirectoy
    })
    try {
      await downloadReq.download(); //Downloader.download() returns a promise.
      await synthesizeMetadata(request, destinationDirectoy);
      return { result: 'file downloaded at xxx' }
    } catch (error) {
      fast.log.error(error);
      return { result: 'Error in filed downaload'}
    }
  
},
// simple schema with primitive metadata, should be expanded
schema: {
  description: 'Get URL to mp4 and meeting metadata.',
  query: S.object()
    .prop('url', S.string().format(S.FORMATS.URL).minLength(10).required())
    .prop('meetingMonth', S.integer().minimum(1).maximum(12).required())
    .prop('meetingDay', S.integer().minimum(1).maximum(31).required())
    .prop('meetingYear', S.integer().minimum(2021).required()),
  response: {
    200: S.object()
      .prop('result', S.string())
  }
}
})

// Run the server!
const start = async () => {
  try {
    await fast.listen(3000)
  } catch (err) {
    fast.log.error(err)
    // TODO - do not exit server on download error
    // recover or correct based on context
    process.exit(1)
  }
}
start()
