import { h, Component } from 'preact';

function GetClass(isFullscreen) {
    var str = "statuspage-status";

    if (isFullscreen){ str += " fullScreen"; }

    return str;
}


const Status = ({ dataStatus, fullScreen = false}) => (
    <div id="status" data-status={dataStatus} data-background={dataStatus} class={GetClass(fullScreen)}></div>
);

export default Status;