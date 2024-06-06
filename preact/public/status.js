const Status = ({ dataStatus, fullScreen = false}) => (
    <div id="status" data-status={dataStatus} data-background={dataStatus} class="statuspage-status fullScreen"></div>
);

export default Status;