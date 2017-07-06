# Transfer Grades
Allows the course team to automatically assign a grade to a student/s for an LTI in the course. 

## Production:
### How to use -

1. Input user IDs 
2. Input target LTI ID
3. Input default grade (0 - 1) e.g. if you would like students to get 60% default grade then you would enter 0.6
4. Optional: adjust grade for individual students
5. Select "Send Grades"



## Development:

##### Step 1)

Ensure that you have apache running on port 80, I recommend using MAMP/WAMP 🐘 or equivalent for a GUI interface

This is necessary as BrowserSyncPlugin proxy setting lets you use existing Apache virtual host for API.

##### Step 2) 🎨 🖌️

Install dependencies 

```
npm install
```
Start webpack watch by using -

```
npm start
```

##### Step 3) 🖼️

Everything should be awesome right now... so start creating your awesome app. 


### Optional

#### JQuery -

You will notice that i've commented out JQuery inside webpack's provider plugin. If you want to use it for any reason you can uncomment and run -
```
npm start
```
to restart webpack. 

#### BundleAnalyzerPlugin -

I've commented this out inside webpack.config as you only need to use it when you're mostly done with your app, this is mainly for optimising your code. 