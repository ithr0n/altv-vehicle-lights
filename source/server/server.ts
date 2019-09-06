import alt from 'alt';

let test = new alt.Vehicle('police3', 0, 7, 72, 0, 0, 0);
alt.log('spawned police car id: ' + test.id);

alt.onClient('disableEmergencySiren', (player: alt.Player, value: boolean) => {
    if (player.vehicle && player.seat === 1) {
        if (value) {
            player.vehicle.setSyncedMeta('sirenDisabled', true);
        } else {
            player.vehicle.setSyncedMeta('sirenDisabled', false);
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
                    veh.setSyncedMeta('IndicatorRight', !veh.getSyncedMeta("IndicatorRight"));
                    veh.setSyncedMeta('IndicatorLeft', false);
                }
                break;
            // Left
            case 1:
                if (!veh.getSyncedMeta("IndicatorBoth")) {
                    veh.setSyncedMeta('IndicatorRight', false);
                    veh.setSyncedMeta('IndicatorLeft', !veh.getSyncedMeta("IndicatorLeft"));
                }
                break;
            // Both
            case 2:
                if (veh.getSyncedMeta("IndicatorBoth")) {
                    veh.setSyncedMeta('IndicatorRight', false);
                    veh.setSyncedMeta('IndicatorLeft', false);
                }
                veh.setSyncedMeta('IndicatorBoth', !veh.getSyncedMeta("IndicatorBoth"));
                break;
        }
    }
});
