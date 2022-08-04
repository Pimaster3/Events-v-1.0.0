module.exports = {
    name: "Check if Voted",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function (data) {
        return `
        <div class="form-group">
            <label">Your Bot ID: *</label>
            <div class="input-group mb-3">
                <input class="form-control needed-field" id="bid" name="bid"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="bid">Insert Variable</a>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label">User ID To Check: *</label>
            <div class="input-group mb-3">
                <input class="form-control needed-field" id="uid" name="uid"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="uid">Insert Variable</a>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label">Tog.gg Auth Token: *</label>
            <div class="input-group mb-3">
                <input class="form-control needed-field" id="tba" name="tba"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="tba">Insert Variable</a>
                </div>
            </div>
        </div>
        
        <h5>Create a switch case and connect it with this node then set the value to check to: <u>\${tempVars.civmod}</u> and values to: <u>true</u> & <u>false</u></h5>
        `;
    },
    init: function (DBS) {
        DBS.BetterMods.requireModule("node-fetch");
        console.log("Loaded Check if Voted");
    },
    mod: function (DBS, message, action, args, command, index) {
        bid = DBS.BetterMods.parseAction(action.bid, message) 
        uid = DBS.BetterMods.parseAction(action.uid, message)
        tba = DBS.BetterMods.parseAction(action.tba, message)
        

        const fetch = DBS.BetterMods.requireModule("node-fetch");
        const url = `https://top.gg/api/bots/${bid}/check?userId=${uid}`;

        fetch(url, { method: "GET", headers: { Authorization: tba }})
            .then((res) => res.text())
            .then( async (json) => {
                var isVoted = JSON.parse(json).voted;
            
                if (isVoted === 0) {
                    await DBS.BetterMods.saveVar("temp", "civmod", "false", message.guild)
                }
                else {
                    await DBS.BetterMods.saveVar("temp", "civmod", "true", message.guild)
                }
            });
        
        DBS.callNextAction(command, message, args, index + 1);
    }
};