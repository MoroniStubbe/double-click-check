class ClickChecker
{
    clicksId;
    doubleClicksId;
    doubleClickPercentageId;
    lastClickTime;
    duration = 0;
    clicks = 0;
    averageDuration;
    doubleClickOffset = 0.5;
    doubleClicks = 0;
    doubleClickPercentage;

    constructor(clickAreaId, clicksId, doubleClicksId, doubleClickPercentageId)
    {
        let e = document.getElementById(clickAreaId);
        e.addEventListener('mousedown', this.onClick);
        this.clicksId = clicksId;
        this.doubleClicksId = doubleClicksId;
        this.doubleClickPercentageId = doubleClickPercentageId;
        e.t = this;
    }
    
    onClick(e)
    {
        e.preventDefault();
        let t = e.currentTarget.t;
        let date = new Date();
        let now = date.getTime();

        if(t.clicks === 0)
        {
            t.lastClickTime = now;
            t.clicks++;
            document.getElementById(t.clicksId).innerHTML = t.clicks;
        }
        else
        {
            let duration = now - t.lastClickTime;

            if(duration < t.doubleClickOffset * t.averageDuration)
            {
                t.doubleClicks++;
                document.getElementById(t.doubleClicksId).innerHTML = t.doubleClicks;
                t.doubleClickPercentage = t.doubleClicks / t.clicks * 100;
                document.getElementById(t.doubleClickPercentageId).innerHTML = t.doubleClickPercentage;
            }
            else
            {
                t.lastClickTime = now;
                t.duration += duration;
                t.clicks += 1;
                document.getElementById(t.clicksId).innerHTML = t.clicks;
                t.averageDuration = t.duration / t.clicks;
            }
        }
    }
}