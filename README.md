## Microsoft Graph Toolkit Editor Web part

The output of the web part,
![Microsoft Graph Toolkit Editor Web part output](https://raw.githubusercontent.com/ktskumar/Images/master/blog/202005/mgt%20webpart%20output.gif)


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
