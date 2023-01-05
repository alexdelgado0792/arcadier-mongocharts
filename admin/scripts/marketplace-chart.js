var p_marketplace_chart = document.currentScript.src;

function MarketplaceMongoChart() {
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    this.packageId = re.exec(p_marketplace_chart.toLowerCase())[1];
    this.customFieldPrefix = this.packageId.replace(/-/g, "");
    this.packagePath = p_marketplace_chart.replace('/scripts/marketplace-chart.js', '').trim();

    if (document.getElementById('packageId') != null) {
        if (document.getElementById('packageId').value === this.packageId) {

            //TODO: Get configuration from Arcadier CT and also create a config page for it. 
            this.RenderPrivateMongoDashboard("REALM APP ID","API KEY", "https://charts.mongodb.com/SOME-IDENTIFIER", "MONGO DASHBOARD ID");
        }
    }
}

MarketplaceMongoChart.prototype.RenderPrivateMongoDashboard = function (realAppId, apiKey, chartBaseUrl, mongoDashboardId) {

    this.loginApiKey(apiKey,realAppId).then(user => {
        const sdk = new ChartsEmbedSDK({
            baseUrl: chartBaseUrl,
            getUserToken: () => marketplace_chart.getUserToken(user)
            // getUserToken is a callback to provide the auth token to the SDK.
        });


        // embed a dashboard
        const dashboard = sdk.createDashboard({
            dashboardId: mongoDashboardId,
            width: "100%",
            height: "800px",
            widthMode: "scale",
            heightMode: "fixed"
            // Additional options go here
            //https://www.npmjs.com/package/@mongodb-js/charts-embed-dom
        });

        // render the chart into a container
        dashboard.render(document.getElementById('dashboard'))
        .catch(() => window.alert('Dashboard failed to initialise'));
    });

}

MarketplaceMongoChart.prototype.getUserToken = function (user) {
    return user.accessToken;
}

MarketplaceMongoChart.prototype.loginApiKey = async function (apiKey, realAppId) {
    // Create an API Key credential
    const app = new Realm.App({
        id: realAppId, // Optional: ~REPLACE~ with your Realm App ID
    });

    const credentials = Realm.Credentials.apiKey(apiKey);
    try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        return user;
    } catch (err) {
        console.error("Failed to log in", err);
    }
}

MarketplaceMongoChart.prototype.RenderPublicMongoDashboard = function (chartBaseUrl, mongoDashboardId) {
    const sdk = new ChartsEmbedSDK({
        baseUrl: chartBaseUrl,
    });

    //   // embed a chart
    //   const chart = sdk.createChart({
    //     chartId: 'chart id',
    //   });

    // embed a dashboard
    const dashboard = sdk.createDashboard({
        dashboardId: mongoDashboardId,
        width: "100%",
        height: "800px",
        widthMode: "scale",
        heightMode: "fixed"
    });

    // render the chart into a container
    dashboard
        .render(document.getElementById('dashboard'))
        .catch(() => window.alert('Dashboard failed to initialise'));
}

var marketplace_chart = undefined;
$(document).ready(() => {
    marketplace_chart = new MarketplaceMongoChart();
});