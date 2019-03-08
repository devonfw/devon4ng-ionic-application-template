# devon4ng-ionic-application-template
This repository contains a basic template of an ionic 4 application, which implements common functionalities such as: login, language settings and interaction with a database (delete, add, modify and update data).

## Dependencies

To run the commands command on the "How to use" section, a Node.js installation with the package ionic is needed.

This application also uses [Capacitor](https://capacitor.ionicframework.com/) to access to native functionalities, so the capacitor module has to be installed.

To show the template on android devices, it is necessary to have [Android Studio](https://developer.android.com/studio) and Android SDK.


|  NOTE: |  devonfw console comes with an Node.js and Ionic installation. |
|--------|-------------------|

## How to use

To use this application, the following steps have to be done:

* download the project or clone this repository.
* run `npm install` in the root folder
* run `ionic serve`

After that, a browser window will be opened to show the app.

* To display the results on an android device:

* run `ionic build --configuration=android`
* run `npx cap copy`
* run `npx cap open android`

The last command opens Android Studio. Once it is opened, build the sdk and run an emulator/connect a device.
