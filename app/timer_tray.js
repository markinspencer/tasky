const { Tray } = require('electron');

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;
    this.setToolTip('Tasky v0.1');
    this.on('click', this.onClick.bind(this));
  }

  onClick(event, bounds) {
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;

      this.mainWindow.setBounds({
        height,
        width,
        y: yPosition,
        x: x - width / 2
      });

      this.mainWindow.show();
    }
  }
}

module.exports = TimerTray;
