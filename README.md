# staticman-netlify-function

*staticman breaks free from servers*

## Introduction

Simple wrapper around [Staticman](https://staticman.net/) that allows it to be hosted as a netlify function. I wrote this to overcome the frequent outages the public instance of staticman was facing due to its increased usage by the static site community.

## Setup
- Create/edit a `netlify.toml` file at the root of your project with the following content. The important thing to note here is the `functions` field which tells netlify where your functions are kept in the project
```toml
[build]
  command = "yarn build"
  functions = "functions"
  publish = "build"
```

- Clone / download this repository and copy the `functions` folder to your project

- Add a `postinstall` script to your project's package.json like so
```s
// package.json
{
    "scripts": {
        //  existing scripts
        "postinstall": "cd functions/staticman && yarn --production"
    }
}
```

- Commit and push the changes

Netlify should now automatically detect and deploy the function. Now to configure staticman.

Staticman needs a [Github token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with repo permissions and a RSA private key (On Mac this can be generated with `ssh-keygen -t rsa -m pem`) As documented [here](https://staticman.net/docs/api), this should be set under GITHUB_TOKEN and RSA_PRIVATE_KEY in Settings > Build & deploy > Environment > Environment variables ([Environment variables in netlify](https://docs.netlify.com/configure-builds/environment-variables/))

Now you can continue past Step 2 in the [guide](https://staticman.net/docs/index.html) and instead of calling `https://api.staticman.net/v2/entry/{GITHUB USERNAME}/{GITHUB REPOSITORY}/{BRANCH}/{PROPERTY}` in the examples, call `https://{YOUR SITE}/.netlify/functions/staticman/{GITHUB USERNAME}/{GITHUB REPOSITORY}/{BRANCH}/{PROPERTY}`

### Changelog
18.09.2020\
Added support for options[redirect] and options[redirectError]
(https://github.com/eduardoboucas/staticman/issues/11#issuecomment-239122262)
(https://github.com/eduardoboucas/staticman/pull/89#issue-109272998)

01.03.2020\
Fixed issue with trailing slashes in URL

17.11.2019\
Initial release
