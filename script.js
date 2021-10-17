(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
        let t = ' EL';
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date(new Date + 1000);
            let h = date.getHours();
            //let h = 13;
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            if (h == 12 || h > 12) {
                if (h > 12) {
                    h = "0" + (h - 12);
                }
                t = ' PL';
            }

            c.innerHTML = h + ":" + m + ":" + s + t;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let fname = document.getElementById('fname');
        let lname = document.getElementById('lname');
        let p1 = document.getElementById('pakend1');
        let p2 = document.getElementById('pakend2');

        //tekstiväljad ei tohi olla tühjad, ei tohi sisaldada numbreid, üks raadionuppudest peab olema valitud (vastasel juhul visatakse ette alert aken) jne.
        if (fname.value === '' || lname.value === '') {
            alert("Palun kirjutage oma ees- ja perekonnanimi!");
            return;
        }

        if (!p1.checked && !p2.checked) {
            alert("Palun vali pakendi tüüp!");
            return;
        }

        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else if (linn.value === "tln") {
            e.innerHTML = "0,00 &euro;";
            styleE();
        } else if (linn.value === "trt") {
            e.innerHTML = "2,50 &euro;";
            styleE();
        } else if (linn.value === "nrv") {
            e.innerHTML = "2,50 &euro;";
            styleE();
        } else if (linn.value === "prn") {
            e.innerHTML = "3 &euro;";
            styleE();
        } else {
            e.innerHTML = "x,xx &euro;";
            styleE();
        }

        function styleE () {
            e.style.color = "red";
            e.style.fontWeight = "900";
        }
            
            
                
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    var pins = new Microsoft.Maps.EntityCollection();

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    let newCenter = new Microsoft.Maps.Location(
        58.3676529, 25.595335
    );

    //lisage kaardile mõni teine aadress (mis EI asu Tartus; oluline on kasutada turvalist protokolli ehk https://..), lisage sellele marker ja muutke kaardi keskpunkt ja suum nii, et mõlemad kohad oleksid kaardil vaikimisi nähtavad;
    let otherPoint = new Microsoft.Maps.Location(
        58.38565, 
        24.50464
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        //center: centerPoint,
        center: newCenter,
        zoom: 8,
        //mapTypeId: Microsoft.Maps.MapTypeId.road,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT'
        });
    
    let pushpin2 = new Microsoft.Maps.Pushpin(otherPoint, {
        title: 'Pärnu Bussijaam'
    });

    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: '<img src="https://p.ocdn.ee/53/i/2019/3/28/l0km55dd.hbn.jpg" width="100px" />'
    };

    pushpin2.metadata = {
        title: 'Pärnu bussijaam',
        description: '<img src="https://visitparnu.com/wp-content/uploads/2020/04/Parnu-bussijaam.jpg" width="100px" />'
    };

    pins.push(pushpin);
    pins.push(pushpin2);

    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

    map.entities.push(pins);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

