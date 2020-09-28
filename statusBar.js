class StatusBar
{
    constructor()
    {
        this.bar=create(60, 60, "statusbar");
    }

    setPercent(percent)
    {
        percent = percent/100;
        this.bar.width=415*percent;
    }
}