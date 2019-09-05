/// <reference path="./typings/altv-client.d.ts" />

import alt from 'alt';
import game from 'natives';

const player = alt.Player.local;

/*
// first try to "re-sync" meta for new connected players
for (let veh of alt.Vehicle.all) {
    if (veh.getSyncedMeta('sirenDisabled'))
        game.disableVehicleImpactExplosionActivation(veh.scriptID, true);
}
*/

alt.on('keydown', (key: number) => {
    switch (key) {
        case 88: // X
            if (player.vehicle && game.getPedInVehicleSeat(player.vehicle.scriptID, -1) === player.scriptID) {
                if (!player.vehicle.getSyncedMeta('sirenDisabled')) {
                    alt.emitServer('disableEmergencySiren', true);
                    game.setNotificationTextEntry('STRING');
                    game.addTextComponentSubstringPlayerName("Siren is disabled.");
                    game.drawNotification(false, true);
                } else {
                    alt.emitServer('disableEmergencySiren', false);
                    game.setNotificationTextEntry('STRING');
                    game.addTextComponentSubstringPlayerName("Siren is enabled.");
                    game.drawNotification(false, true);
                }
            }
            break;

        case 100: // Num4
            if (player.vehicle && game.getPedInVehicleSeat(player.vehicle.scriptID, -1) === player.scriptID) {
                alt.emitServer("toggleIndicator", 1);
            }
            break;

        case 101: // Num5
            if (player.vehicle && game.getPedInVehicleSeat(player.vehicle.scriptID, -1) === player.scriptID) {
                alt.emitServer("toggleIndicator", 2);
            }
            break;

        case 102: // Num6
            if (player.vehicle && game.getPedInVehicleSeat(player.vehicle.scriptID, -1) === player.scriptID) {
                alt.emitServer("toggleIndicator", 0);
            }
            break;
    }
});

alt.on("syncedMetaChange", (entity: alt.Vehicle, key: string, value: boolean) => {
    switch (key) {
        case "sirenDisabled":
            if (value) {
                game.disableVehicleImpactExplosionActivation(entity.scriptID, true);
            } else {
                game.disableVehicleImpactExplosionActivation(entity.scriptID, false);
            }
            break;

        case "IndicatorBoth":
            game.setVehicleIndicatorLights(entity.scriptID, 0, value);
            game.setVehicleIndicatorLights(entity.scriptID, 1, value);
            break;

        case "IndicatorRight":
            game.setVehicleIndicatorLights(entity.scriptID, 0, value);
            break;

        case "IndicatorLeft":
            game.setVehicleIndicatorLights(entity.scriptID, 1, value);
            break;
    }
});