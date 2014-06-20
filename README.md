icapjs
======

**icapjs** (c) 2014 by [SwordLord - the coding crew](http://www.swordlord.com/)

## Introduction ##

**icapjs** is a very lightweight ICAP server. **icapjs** is completely written in JavaScript and runs within a Node.js instance.

If you want to log everything running through a proxy server, **icapjs** might be for you.

**icapjs** does have some dependencies regarding JavaScript libraries, but all of these can be installed with the help of the npm.


## Status ##

**icapjs** is beta software and should be handled as such:

- Not 100% standard compliant, currently only supporting status 204 No Content. Which is good enough for logging all your traffic.
- Is known to run fine as an ICAP server within a Squid3 / sslbump setup.


## Installation ##

First of all, you need a Node.js installation. Then a directory to put **icapjs** into. Then you need to

	npm install log4js


## How to run ##

Quite simple:

	nodejs icap_server.js


## Contribution ##

If you happen to know how to write JavaScript, documentation or can help out with something else, drop us a note at *contact at swordlord dot com*. As more
helping hands we have, as quicker this server gets up and feature complete.


## Dependencies ##

For now, log4js, since watson chickened out when trying to use file based logging.


## License ##

**icapjs** is published under the GNU General Public Licence version 3. See the LICENCE file for details.