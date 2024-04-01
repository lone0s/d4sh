# PROJET WEB 

## DB

In case we don't end up hosting the website && database on vercel, full on sql scripts to create and populate the database are present in the sqlscripts folder.
The do_it_all.sh script is the more important one. 
You'll need to make sure that your postgres credentials match the username and password for the database.
So edit it before going forward !

## PRISMA

- To generate the prisma ORM from the prisma schema (already edited√) : 
`prisma generate`

## RUN IT ALL UP !

Start with :
```bash
cd <path_to_root_of_d4sh_project>/sqlscripts
./do_it_all.sh
cd ..
```
 
If prisma isn't installed globally add this : 

`npm install -g prisma`

And finally :
 
```
npm install
prisma generate
npm run dev
```

Your webserver should be up and running at localhost:3000 !

