# Machine Status

Application to show the machine status screens both for Diamond displays and internal web access.

## Dependencies

This application depends on the cs-web-lib library: https://github.com/dls-controls/cs-web-lib. Packages are available to download from: https://github.com/dls-controls/cs-web-lib/packages/. Check for the latest package.

## Installation

- Clone the machine-status repo:

  `git clone git@github.com:dls-controls/machine-status.git`

- Download the lastest cs-web-lib from https://github.com/dls-controls/cs-web-lib/packages/ and ensure it is placed in the same directory containing the machine-status clone.
- Move into the machine-status directory:

  `cd machine-status/`

- Use npm to install the application dependencies:

  `npm install`

- Update the .env variables:
  - REACT_APP_CONIQL_SOCKET - point to the server hosting the coniql application.
  - REACT_APP_CONNIQL_SSL=true
  - REACT_APP_BASE_URL - URL to run on.
  - REACT_APP_PAGE_DISPLAY_TIME_SEC - page cycle interval.
  - REACT_APP_BUILD_TARGET - run the 'screen' or 'public' version of the application.
- From here you can run the application or create a production build to serve:

  - Run:

    `npm run start`

  - Build & serve:

    `npm run build`

    `serve -s build`
