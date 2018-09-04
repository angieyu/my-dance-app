# AdvancedNodeStarter
Starting project for a course on Advanced Node @ Udemy

#Getting started
- Run npm install on root level
- Run npm install again in client folder
- npm run dev on root level

mlab database user/pass
angela/acy12345

#Start redis locally
brew services start redis
check if redis is up
redis-cli ping

#Features of the application
Redis to cache get calls
The application will check Redis to see if the data is cached. If not, then it will reach out to MongoDB
Overwrote the exec function in Mongoose to integrate with Redis