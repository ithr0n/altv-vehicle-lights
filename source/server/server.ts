import alt from 'alt';

new alt.Vehicle('police3', 0, 7, 72, 0, 0, 0);

alt.onClient('disableEmergencySiren', (player: alt.Player, value: boolean) => {
    if (player.vehicle && player.seat === 1) {
        if (value) {
            globalSyncMeta(player.vehicle, 'sirenDisabled', true);
        } else {
            globalSyncMeta(player.vehicle, 'sirenDisabled', false);
        }
    }
});

alt.onClient("toggleIndicator", (player: alt.Player, indicatorID: number) => {
    if (player.vehicle && player.seat === 1) {
        const veh = player.vehicle;
        switch (indicatorID) {
            // Right
            case 0:
                if (!veh.getSyncedMeta("IndicatorBoth")) {
                    globalSyncMeta(veh, 'IndicatorRight', !veh.getSyncedMeta("IndicatorRight"));
                    globalSyncMeta(veh, 'IndicatorLeft', false);
                }
                break;
            // Left
            case 1:
                if (!veh.getSyncedMeta("IndicatorBoth")) {
                    globalSyncMeta(veh, 'IndicatorRight', false);
                    globalSyncMeta(veh, 'IndicatorLeft', !veh.getSyncedMeta("IndicatorLeft"));
                }
                break;
            // Both
            case 2:
                if (veh.getSyncedMeta("IndicatorBoth")) {
                    globalSyncMeta(veh, 'IndicatorRight', false);
                    globalSyncMeta(veh, 'IndicatorLeft', false);
                }
                globalSyncMeta(veh, 'IndicatorBoth', !veh.getSyncedMeta("IndicatorBoth"));
                break;
        }
    }
});

// second try to "re-sync" meta for new connected players
const globalSyncedMeta = new Map<alt.Entity, Map<string, any>>();
alt.on('playerConnect', (player: alt.Player) => {
    globalSyncedMeta.forEach((metas: Map<string, any>, entity: alt.Entity) => {
        metas.forEach((value: any, key: string) => {
            entity.setSyncedMeta(key, value);
        });
    });

    alt.emitClient(player, 'resyncVehicleLights', globalSyncedMeta);
});

alt.on('removeEntity', (target: alt.Entity) => {
    if (globalSyncedMeta.has(target)) globalSyncedMeta.delete(target);
});

function globalSyncMeta(target: alt.Entity, key: string, value: any) {
    if (!globalSyncedMeta.has(target)) globalSyncedMeta.set(target, new Map());

    globalSyncedMeta.get(target)!.set(key, value);
    target.setSyncedMeta(key, value);
}