# Contributing to Alpha

Thank you for taking the time to contribute to the project! ✨

## Getting started

First, install necessary tools:

- [Node](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Git](https://git-scm.com/downloads)
- [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)
  (only Windows)

Then, you can clone this repository to your local machine:

```sh
git clone https://github.com/arthurdevv/alpha.git
```

Install the dependencies:

```sh
yarn install
```

Run the code in development mode:

```sh
yarn run dev
```

After that, you can package the binaries:

```sh
yarn run package
```

**Note: It will generate the binary in the `release` folder.**

##### If you get `node-pty` issues, run:

```sh
yarn run rebuild-pty
```
