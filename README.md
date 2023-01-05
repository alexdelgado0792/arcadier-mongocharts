# Arcadier + Mongo Charts
Arcadier Plugin in order to render Mongo Charts service with Atlas App Service authentication (API Key authentication) using the Embedding SDK for Web

## Arcdier Plugin File structure

The file structure of each Plug-in's source code:

    ├── admin                    
        ├── html
        ├── css
        └── scripts                
        └── php files                
    ├── user                   
        ├── html
        ├── css
        └── scripts 
        └── php files 

> admin folder contains the part of the code that executes for the marketplace administrator.

> user folder has the code that executes for the merchants and buyers.

<br>

## Mongo DB Requirements

1. Database
2. App Services
3. Charts

<br>

## How to install plugin in Arcadier Developer Dashboard

1. Download repository.
2. Change in marketplace-chart.js file with the corresponding credentials and chart.

```javascript
this.RenderPrivateMongoDashboard("REALM APP ID", "API KEY", "https://charts.mongodb.com/SOME-IDENTIFIER", "MONGO DASHBOARD ID");
```

3. Compress (.zip) the admin and user folder.
4. Login to Arcadier Plug-in Developer Dashboard.
5. Create a new Plug-in.
6. Create custom tables and custom field (if needed).
7. Upload .zip file in the created Plug-in.
8. Login into your marketplace admin portal.
9. Go to Plug-in
10. Search for the Plug-in and install it.