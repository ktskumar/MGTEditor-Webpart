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


Ensure the Microsoft Graph Toolkit SharePoint Framework package is already deployed to your tenenat. Otherwise we will receive the error in webpart.
[Download Microsoft Graph Toolkit for SharePoint Framework](https://github.com/microsoftgraph/microsoft-graph-toolkit/releases/download/v2.3.1/mgt-spfx-2.3.1.sppkg)


## v1.3.0.0
- Upgraded to SPFX version 1.13.1
- Updated User Experince

