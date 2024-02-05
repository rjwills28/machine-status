# Machine Status

Application to show the machine status screens both for Diamond screens and web access.

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

## Setup

### /src

The `/src` directory contains the main code of the Machine Status application. Most notable of this are the `app.tsx` and `index.tsx` files which contain the configuration for starting the app, and which version should be started. Alongside this, there is also

- `/customDisplays/` directory. This contains any `.tsx` files or CSS that are needed for the additional webpages needcustom displays are extra webpages that are displayed as extensions for beamlines.
- `/components/` directory. This contains the `.tsx` and `.css` for the Header and Footer

### /public

This directory contains external files which will be displayed in Machine Status. These files are split into directories:

- `/json` - contains .json files which specify which .opi/.bob files to use
- `/dls` - contains the .opi/.bob files to use

## Screen vs Public

The `screen` and `public` versions of Machine Status display the same information, in different formats.

- `screen` - intended for the Status Display Machine (SDM) screens around Diamond. This cycles between different pages on a timer. Not intended to have user interaction
- `public` - intended to be viewed on a webpage from both inside and outside Diamond. Different pages are navigated to by clicking buttons. Extra considerations such as resizing/scroll useability are taken into account. Changes to this version should be tested on firefox, Chrome, Edge and (if possible) Mac before release, to take into account the varied use base at Diamond.

The `public` implementation of Machine Status is made accessible to the wider internet.

The `screen` implementation includes additional webpages for custom SDMs e.g. i19-sdm002, which is found on the webpage at `/i19-sdm002`.

## Docker Image Build

Both the `screen` and `public` versions of Machine Status are built using the same Dockerfile and Kaniko script. The environment variable `REACT_APP_BUILD_TARGET` is used to determine which is built.

We use the alpine version of the node docker image as it is lightweight and optimised for size and security. It is ideal as we do not make use of the traditional Linux libraries and utilities. Additionally, as the `public` Machine Status is accessible to the wider internet, it needs to be as secure as possible. Tools such as trivy can be used to scan built images for CVEs (Common Vulnerabilities and Exposures) and the images should be kept up-to-date to minimise these risks.

## Continuous Integration

We use continuous integration to build and release the `screen` and `public` Machine Status images. The jobs that build the images rely on a successful build of the applications.
Using the Kaniko script `kanikobuild.sh`, the applications and images are built on every push to the repository for any branch, but not pushed to the image registry.

When any changes are pushed/merged into the integration branch, the built images are released to the image registry with the tags `integration` and `latest`.

If a tag is pushed, e.g. `x.x.x`, the built images are released to the image registry with the tags `x.x.x` and `latest`.
