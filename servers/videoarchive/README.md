# Big Blue Button x Rocket.Chat Meeting Manager 

## Video Archive Server Webhook

Handling Recording Archive Management

Upon completion of processing of an MP4 recording, the following workflow starts:

1)  bbb sends an event to the Rocket.Chat App webhook, supplying URL location of the mp4 and other metadata information

2)  the Rocket.Chat App webhook validates this information and process it for metadata, then make a call to the AVideo (video archiver)'s webhook and ask it to download the mp4 and create the Viewable-Entry (a Youtube like listing)

3)  this directory contains the server to field the AVideo webhook, it should be running on the same server as AVideo   ---   the optimizes  for ONE SINGLE DOWNLOAD in the entire workflow



### quick start on server

```
npm i
node server
curl http://localhost:3000/downloadmp4?url=https%3A%2F%2F-URL-TO-SOME-LARGE-MP4-File.mp4&meetingMonth=1&meetingDay=1&meetingYear=2021
```

More details to come
