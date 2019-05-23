# FestiAccess

FestiAccess is a light application for checking who is in a festival. At the entry of the festival, there is a *guard*  (role: **secu**) that waits for *people* to come (role: **user**). When *people* try to enter the festival they have to use their fingerprint on the *guard* phone to testify that they are here. When they are authentified, the app (on *guard's* phone) show them friends that are already in the festival.

*People* can add *friends* (*people*) to their list

- Pages :
  - Home
  - Connection 
  - Subscribtion 
  - Main 
  - Authentified ​​
  - MessageForDownload ​​
  - Settings 
  - Friends
  - AddFriend



## API: 

## 	Connection

Connection :arrow_right: HTTP API :arrow_right: Server = 
**[
  {
    "fingerPrintHash" : "cmFuZG9tX2hhc2g="
  }
]**

#### User (norman person that comes to the festival)

Connection :arrow_left: HTTP API :arrow_left: Server (when **OK**)
HTTP CODE : **200**
JSON :

**[
  {
    "message": "AUTHENTIFICATION_OK",
    "name": "Dardan",
    "surname" : "Iljazi",
    "ishere" : true,
    "fingerPrintHash": "cmFuZG9tX2hhc2g=",
    "role" : "user",
    "friends" : [
      {
        "name" : "Laurent",
        "surname" : "Ruquier",
        "ishere" : false,
        "fingerPrintHash" :  "asdasdasd=",
        "role" : "user"
      },
      {
        "name" : "James",
        "surname" : "Bond",
        "ishere" : true,
        "fingerPrintHash" :  "asdasdasd=",
        "role" : "user"
      }
    ]
  }
]**



#### Secu (the man that checks entries)

Connection :arrow_left: HTTP API :arrow_left: Server (when **OK**)
HTTP CODE : **200**
JSON :

**[
  {
    "message": "AUTHENTIFICATION_OK",
    "name": "Grand",
    "surname" : "Baracké",
    "ishere" : true,
    "fingerPrintHash": "cmFuZG9tX2hhc2g=",
    "role" : "secu",
    "friends" : []
  }
]**

#### OTHER CASES

Connection :arrow_left: HTTP API :arrow_left: Server (when **FAIL**)
HTTP CODE : **401**
JSON :
**[
  {
    "message" : "AUTHENTIFICATION_FAIL"
  }
]**



## 	Subscription

Subscription :arrow_right: HTTP API :arrow_right: Server = 
JSON :
**[
  {
    "name"  : "Dardan",
    "surname" : "Iljazi",
    "fingerPrintHash" : "cmFuZG9tX2hhc2g="
  }
]**

Subscription :arrow_left: HTTP API :arrow_left: Server (when **OK**)
HTTP CODE : **201**
JSON :
**[
  {
    "message" : "CREATED_RESOURCE"
  }
]**

Subscription :arrow_left: HTTP API :arrow_left: Server (when **ALREADY EXISTS**)
HTTP CODE : **409 (Conflict)**
**JSON :
[
  {
    "message" : "RESOURCE_ALREADY_EXISTS"
  }
]**





## 	Add friend

Add friend:arrow_right: HTTP API :arrow_right: Server = 
JSON :
**[
  {
    "fingerPrintHashes" : ["cmFuZG9tX2hhc2g=", "asdasdasd="]
  }
]**

Add friend :arrow_left: HTTP API :arrow_left: Server (when **OK**)
HTTP CODE : **201**
JSON :
**[
  {
    "message" : "CREATED_RESOURCE"
  }
]**

Add friend :arrow_left: HTTP API :arrow_left: Server (when **NOT FOUND**)
HTTP CODE : **404 **
**JSON :
[
  {
    "message" : "RESOURCE_NOT_FOUND"
  }
]**



