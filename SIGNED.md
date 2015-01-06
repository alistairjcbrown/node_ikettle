##### Signed by https://keybase.io/alistairjcbrown
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

iQEcBAABCgAGBQJUqyn5AAoJEJEOHi8Q7zzzFiQH+wbAdsOprp43ZkWvGrKqdRjY
/45nj0yNYpO19bcosiOKoW948NYTJJOQjH19AKDur5IjCawFQmysmsMPFEIBX0rA
gRsCfrg/scUzIJhAzE9ICdAyeUPc4fG8YzTnOF+JoN2b/xGz0fIrE88wk4YugIhG
qkIUwnHkbPdwxHF1js+S5L1tFqE6//3MMRh3CyMOYxGI3UyKXZkYp6/IMVqTFJ1M
qKQbD9IkFr7gx+D0Ka3bl4JkCQtch6YIBH8oWkcVGaVAVBOtE7NgaOEfL1GCFcxk
3HmB3dACvmDs8Z2P9Dsfk8sIyYKHkuTs80vCQa1zFburFLaSpIonXq1HdECbTfU=
=i02n
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
2922           README.md                69023c537320d1510321b1965e51ccbaa7b063121e476e6b65aea321040e5c52
               config/                                                                                  
386              jscs.json              375a3f95f4b5a001c957a21e9550d244a22b27f81ce44e809567eada96fca805
1006             jshint.json            1d80547f64355a68a80a238bbc21cc7b9af592c5b820b5b96b4def47d90c9972
299              lib.json               aaa5b13685f3b1be41e2772d32416fb6f0b37cf67fab18daac0c0fa2b6e66bec
517              requirejs.json         3de31985dc3092bf974ef93985dbad6c9da6dc2646a785def55223f149cb2df3
               examples/                                                                                
1045             listen-for-changes.js  3856ecbec919b95263dcb65036789448d71a02c11ac87750b51acc8a11e06829
46             index.js                 bb7f630e7efdcbaf24e5ada6b925c58eaaa839007a56a2c3e896d43b75e708bb
               lib/                                                                                     
6464             connection.js          52f9327c4b9c897cacc96d837be65ede6e8460c0097cabd1247efa5b4c7d0914
                 models/                                                                                
4769               state.js             783c954b70d9869f59f46fd8b66acda9ad8d085c41ec3a191c1b5e558abf5211
289              utils.js               6e8fcf7ee8297ba47ad3a909e79bb81cb61068db5026dbed9f0b57bfd27318df
1016           package.json             541e79305a42acc44335c8f1b84022626ee06ad594ceb3794ce59dfd2685cec1
               tests/                                                                                   
16909            connection.test.js     287ef56d70faf1b2d1829a5b3f1b6e90acb668522cd4ccbe7bafe10a937a4304
                 mocks/                                                                                 
429                net-socket.js        2aa7f7a985b20ee22f3eca658773c93cfe43d367d23696832749531622f897b2
                 models/                                                                                
17555              state.test.js        f538c524cf3c3473c5722d22dd870468978d4dc19e301db871bde087a582f1b8
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