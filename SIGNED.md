##### Signed by https://keybase.io/alistairjcbrown
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

iQEcBAABCgAGBQJUpuTUAAoJEJEOHi8Q7zzznBsH/1188tL86nXVTNLQ06oDP9ts
T8aDSYt6WOWMgGufFLU4zlJFfkrzD0RiiMFvk4LCdWGB3vqHC8lh3abUDi7SOwRI
Ao257gxeGThT0eXWhdlE0/2pxuDI1TKugy6U5sg22lTZbdHrMTmT6m8vMO1jp5z+
nNtkbXEZcWXasDhyynhJEl2QBg5cMiMJW3+PO+3AOLS2HHWRC9HgRovR8TITok8c
eej2M1vIR2gRQFvkCsrmtonbcP0K5xj9HW1CRyVwAMWnfJcSuYIz64J1o+qD7V2U
XtrDr3hMe7bcVW3XlFAxnyLrAJj48xmLFNGZrXtLlLDh1Cu0devrt8cdTiJYksE=
=9+3z
-----END PGP SIGNATURE-----

```

<!-- END SIGNATURES -->

### Begin signed statement 

#### Expect

```
size   exec  file                       contents                                                        
             ./                                                                                         
27             .gitignore               403de3e1c73edcfaa2f46ff6146f414ddcaeed97717a02af53733b31c2dec963
125            .travis.yml              dc0aebfa2af0cda0911aeb83f023797c055fc2e705f0dadcb9bc6d8493e860ad
1800           Gruntfile.js             a3a5d9149ffbce99f93d85d57d956354c53587148b24335e57c6a14562eefe0f
1082           LICENSE                  a5d167a6021c287a5f5a609e57bf87fbeebdc132a8837b62f147eef2bfc29b0d
2697           README.md                7432411dc0a9751d1afcab9185c97024f7e0daf89d08e1b392881d9a873ae1ee
               config/                                                                                  
386              jscs.json              375a3f95f4b5a001c957a21e9550d244a22b27f81ce44e809567eada96fca805
1006             jshint.json            1d80547f64355a68a80a238bbc21cc7b9af592c5b820b5b96b4def47d90c9972
252              lib.json               4d18fc7fe1ac2ce17685cf0ade54b4b385a1bd56de021d83c982ad14a9aefebc
517              requirejs.json         3de31985dc3092bf974ef93985dbad6c9da6dc2646a785def55223f149cb2df3
               examples/                                                                                
1072             listen-for-changes.js  8d68edb3c7920085d9110c1ea58eea369f94964c68a108d62ca157d4afe73b50
46             index.js                 bb7f630e7efdcbaf24e5ada6b925c58eaaa839007a56a2c3e896d43b75e708bb
               lib/                                                                                     
3998             connection.js          514f32188a74f400212d5015c55b0a0ea558f518064edb66d9b910b78c3b205a
                 models/                                                                                
4104               state.js             1b7557d948286360d20b6982f0012df2db95812611837783fc1cd73116933edd
289              utils.js               6e8fcf7ee8297ba47ad3a909e79bb81cb61068db5026dbed9f0b57bfd27318df
1016           package.json             1c94311969e3e935547376f11412da376b4af54b14784f37df670fa9880c1730
               tests/                                                                                   
10166            connection.test.js     15d6075f7762e555611ef1bb7d0ddcbe3db74802e3889e0aedcadbd4b92a93f1
                 mocks/                                                                                 
518                net-socket.js        3baf3d3b2b2ddf250a513ed24f59fdba3ca9c3183b339afcdec65df4d173d237
                 models/                                                                                
9036               state.test.js        a3e239df977c376eccd719c290a4644e83a8cfe07de5ec4d0318a04d0a1db124
1522             utils.test.js          3f0eec40c25586ef88d99305e24ef2a59aec297c02e9f3044eebaac01dd30348
```

#### Ignore

```
/SIGNED.md
```

#### Presets

```
git      # ignore .git and anything as described by .gitignore files
dropbox  # ignore .dropbox-cache and other Dropbox-related files    
kb       # ignore anything as described by .kbignore files          
```

<!-- summarize version = 0.0.9 -->

### End signed statement

<hr>

#### Notes

With keybase you can sign any directory's contents, whether it's a git repo,
source code distribution, or a personal documents folder. It aims to replace the drudgery of:

  1. comparing a zipped file to a detached statement
  2. downloading a public key
  3. confirming it is in fact the author's by reviewing public statements they've made, using it

All in one simple command:

```bash
keybase dir verify
```

There are lots of options, including assertions for automating your checks.

For more info, check out https://keybase.io/docs/command_line/code_signing