##### Signed by https://keybase.io/alistairjcbrown
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

iQEcBAABCgAGBQJUp1YLAAoJEJEOHi8Q7zzzCjsIALWo/FHF6OIlt8XfwWAlzDEY
WQHOEEA/tuOKffl+47LDCdVMyesIXnJKR4sko512k5h34JjMH399fZ1WTtnrXLV7
JOKo7/VC4VtNTAsvrjYY/JcFAyLjSvI/RV+BYv75eXO4LxiGwMjBYh0fQDXNpReY
o8/yRIOCKNsfJLNDjwdC2DGCKqlOrnfHJmHPGNhOu1DcWAo/sSXvNOasG6SVr7Sq
8uTETlvvnZ97QFVBanCRlBPXmorsGQ/jn6c9de2iGInrPJWWiMfRGfL2hklxIhTF
jVqgPMG0susmfHyR5qmMkGepopWDwXQuwm0mlEP+eshpd566qlMyMLw2G2Gkt0w=
=XCKn
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
5185             connection.js          7d03dff0dd35f9d552f23e523c61764bb07301a2c9761b904d5eda823f690b2e
                 models/                                                                                
4735               state.js             c37c3f36f506431ddb750658a03363d1c97bd47523e2ddfd9b793a6a361fe768
289              utils.js               6e8fcf7ee8297ba47ad3a909e79bb81cb61068db5026dbed9f0b57bfd27318df
1016           package.json             541e79305a42acc44335c8f1b84022626ee06ad594ceb3794ce59dfd2685cec1
               tests/                                                                                   
12615            connection.test.js     47dd240fa134e4869996c911b8d42afd218209155272b6eb6f299c1051a2210e
                 mocks/                                                                                 
433                net-socket.js        a155f010e9b4707352325fcffcbf6702be643bc1abf90bf9729f7b53b40eecad
                 models/                                                                                
15997              state.test.js        40f5b247a28a829d21b814a4316a1decd02771a2cadb89b1a0f253f84aa5a968
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