##### Signed by https://keybase.io/alistairjcbrown
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

iQEcBAABCgAGBQJUpzvUAAoJEJEOHi8Q7zzz9IQH/Rjhzvl5Va0FeWFWlqfEfj2x
3S9eRLqU9pkO4Sv2p5Hw2RrRRc8b4jfMJPW2J7wutxPM4NerFlN9xdpx+cbAoGzY
w+t5hE/YoVfcQE1sglGvR2SPkJwkDpjpxFpSh5bFkk5OZth9puEkw9kqfGRYQTf2
tk3SZDDnjK4ENouWRQ+qoj/rlEMq6R+6hqAUhs0Qo1vrHpdF0/UUp61lD1wo2wCG
xBHeyj5lt1kCSIWruCWEf25u5MEuLi9sPmMF4su8wNAPXzvnAiei1HLNgLKtQXFv
NP8QaqPVvwpHtAzKAUudlJDNsQB4/bYyY6gWoWhai/rgLTZmAXxcD1xUTpuO3GA=
=JwGs
-----END PGP SIGNATURE-----

```

<!-- END SIGNATURES -->

### Begin signed statement 

#### Expect

```
size   exec  file                       contents                                                        
             ./                                                                                         
37             .gitignore               ca54bfd89562810ea8c241ec693e6080c2808bbd33da5a12bbbed1525349fade
125            .travis.yml              dc0aebfa2af0cda0911aeb83f023797c055fc2e705f0dadcb9bc6d8493e860ad
1847           Gruntfile.js             daa49789e70c7ed6a14f158257c2a64e4aeeb3f3c54378d32101ba8193e74575
1082           LICENSE                  a5d167a6021c287a5f5a609e57bf87fbeebdc132a8837b62f147eef2bfc29b0d
2764           README.md                6fb370535319add46826be4ff5e4c2d1987b3cf84f4de693c1f14e26086f31f2
               config/                                                                                  
386              jscs.json              375a3f95f4b5a001c957a21e9550d244a22b27f81ce44e809567eada96fca805
1006             jshint.json            1d80547f64355a68a80a238bbc21cc7b9af592c5b820b5b96b4def47d90c9972
252              lib.json               4d18fc7fe1ac2ce17685cf0ade54b4b385a1bd56de021d83c982ad14a9aefebc
517              requirejs.json         3de31985dc3092bf974ef93985dbad6c9da6dc2646a785def55223f149cb2df3
               examples/                                                                                
1045             listen-for-changes.js  3856ecbec919b95263dcb65036789448d71a02c11ac87750b51acc8a11e06829
46             index.js                 bb7f630e7efdcbaf24e5ada6b925c58eaaa839007a56a2c3e896d43b75e708bb
               lib/                                                                                     
4559             connection.js          3462e4c0c0e31d340239ccb8c3adb8636f1dcaefdc2b2deaeb1eaaa2976637c5
                 models/                                                                                
4130               state.js             57af748d7859453ecc351bde162835a0dd96a59d7234f33a5e6332122fd0434c
289              utils.js               6e8fcf7ee8297ba47ad3a909e79bb81cb61068db5026dbed9f0b57bfd27318df
1016           package.json             541e79305a42acc44335c8f1b84022626ee06ad594ceb3794ce59dfd2685cec1
               tests/                                                                                   
11082            connection.test.js     cc71dc827c65ff82d790daaae0f09153319438509ab24f628c6e810daef60115
                 mocks/                                                                                 
433                net-socket.js        a155f010e9b4707352325fcffcbf6702be643bc1abf90bf9729f7b53b40eecad
                 models/                                                                                
14480              state.test.js        24bf84747153216f70b67352c2e3ebc34e41fbf6e6ae88758ad4f62f7becbcb2
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