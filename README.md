1. the max number of contacts that can be returned are 1k, if you want contacts after that then you need to send the nextPageToken that comes with google api to get further contacts on the nextpage. The google contacts api works in pagination way where it can return upto 1k user at single page.